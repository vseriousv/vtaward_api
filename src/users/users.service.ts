import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { compare, genSalt, hash } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '../shared/config/config.service';
import { State } from '../state/state.entity';
import { MailService } from '../mail/service/mail.service';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async findAll() {
    const users = await this.usersRepository.findAll<User>({
      include: [State],
      order: [['id', 'ASC']],
    });
    return users.map(user => new UserDto(user));
  }

  async findAllCommittee() {
    const users = await this.usersRepository.findAll<User>({
      include: [State],
      where: { role: 'comittee' },
      order: [['id', 'ASC']],
    });
    return users.map(user => new UserDto(user));
  }

  async getUser(id: number) {
    const user = await this.usersRepository.findByPk<User>(id,{
      include: [State],
      order: [['id', 'ASC']],
    });
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDto(user);
  }

  async getUserByTab(tabNumber: string) {
    console.log('[tabNumbertabNumber]', tabNumber)
    const resp = await this.usersRepository.findOne<User>({
      include: [State],
      where: { tabNumber },
    });
    return resp;
  }



  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();

      user.email = createUserDto.email.trim().toLowerCase();
      user.tabNumber = createUserDto.tabNumber;
      user.firstnameRu = createUserDto.firstnameRu;
      user.firstnameEn = createUserDto.firstnameEn;
      user.lastnameRu = createUserDto.lastnameRu;
      user.lastnameEn = createUserDto.lastnameEn;
      user.patronymicRu = createUserDto.patronymicRu;
      user.patronymicEn = createUserDto.patronymicEn;
      user.stateId = createUserDto.stateId;
      user.img = createUserDto.img;
      user.cityName = createUserDto.cityName;
      user.positionName = createUserDto.positionName;
      user.sectionName = createUserDto.sectionName;
      user.passwordText = createUserDto.password;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);

      const userData = await user.save();

      const token = await this.signToken(userData);

      return new UserLoginResponseDto(userData, token);
    } catch (err) {
      if (
        err.name === 'SequelizeUniqueConstraintError' &&
        err.original.constraint === 'user_tab_number_key'
      ) {
        throw new HttpException(
          `User with email '${createUserDto.tabNumber}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async responsePassword(tabNumber): Promise<boolean>{
    if (tabNumber) {
      try {
        const user = await this.getUserByTab(tabNumber);
        console.log('[USER]:',user)
        await this.mailService.sendEWS({
          userTo: user.email,
          userFrom: 'vtaward@vost-tech.ru',
          text: 'Ваш пароль: ' + user.passwordText
        });
        return true;
      } catch (e) {
        throw new BadRequestException(e)
      }
    }
  }





  async login(userLoginRequestDto: UserLoginRequestDto) {
    const tabNumber = userLoginRequestDto.tabNumber;
    const password = userLoginRequestDto.password;

    const user = await this.getUserByTab(tabNumber);
    if (!user) {
      throw new HttpException(
        'No user with this tab number',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    user.email = updateUserDto.email || user.email;
    user.tabNumber = updateUserDto.tabNumber || user.tabNumber;
    user.firstnameRu = updateUserDto.firstnameRu || user.firstnameRu;
    user.firstnameEn = updateUserDto.firstnameEn || user.firstnameEn;
    user.lastnameRu = updateUserDto.lastnameRu || user.lastnameRu;
    user.lastnameEn = updateUserDto.lastnameEn || user.lastnameEn;
    user.patronymicRu = updateUserDto.patronymicRu || user.patronymicRu;
    user.patronymicEn = updateUserDto.patronymicEn || user.patronymicEn;
    user.stateId = updateUserDto.stateId || user.stateId;
    user.role = updateUserDto.role || user.role;
    user.img = updateUserDto.img || user.img;

    try {
      const data = await user.save();
      return new UserDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAvatar(id: number, fileImage: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    user.img = fileImage;

    try {
      const data = await user.save();
      return new UserDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    await user.destroy();
    return new UserDto(user);
  }


  async signToken(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      state_id: user.stateId,
      tab_number: user.tabNumber,
      role: user.role,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
