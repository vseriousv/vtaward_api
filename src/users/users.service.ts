import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from './../shared/config/config.service'
import { Position } from '../position/position.entity';
import { Section } from '../section/section.entity';
import { State } from '../state/state.entity';
import { City } from '../city/city.entity';
import { Nomination } from '../nomination/nomination.entity';
// import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly configService: ConfigService,
    // private readonly mailerService: MailerService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async findAll() {
    const users = await this.usersRepository.findAll<User>({
      include: [Position, Section, State, City, Nomination],
      order: [['id', 'ASC']],
    });
    return users.map(user => new UserDto(user));
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findByPk<User>(id,{
      include: [Position, Section, State, City, Nomination],
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

  async getUserByTab(tab_number: string) {
    return await this.usersRepository.findOne<User>({
      include: [Position, Section, State, City, Nomination],
      where: { tab_number },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();

      user.email = createUserDto.email.trim().toLowerCase();
      user.tab_number = createUserDto.tab_number;
      user.firstname_ru = createUserDto.firstname_ru;
      user.firstname_en = createUserDto.firstname_en;
      user.lastname_ru = createUserDto.lastname_ru;
      user.lastname_en = createUserDto.lastname_en;
      user.patronymic_ru = createUserDto.patronymic_ru;
      user.patronymic_en = createUserDto.patronymic_en;
      user.position_id = createUserDto.position_id;
      user.section_id = createUserDto.section_id;
      user.state_id = createUserDto.state_id;
      user.city_id = createUserDto.city_id;
      user.nomination_id = createUserDto.nomination_id;
      user.description_ru = createUserDto.description_ru;
      user.description_en = createUserDto.description_en;
      user.img = createUserDto.img;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);

      const userData = await user.save();
      // await this.mailerService.sendMail({
      //       to: 'zombotv82@gmail.com', // list of receivers
      //       from: 'noreply@nestjs.com', // sender address
      //       subject: 'Testing Nest MailerModule ✔', // Subject line
      //       text: 'welcome', // plaintext body
      //       html: '<b>welcome</b>', // HTML body content
      //     })
      //     .then(() => {})
      //     .catch(() => {});
      // when registering then log user in automatically by returning a token
      const token = await this.signToken(userData);
      return new UserLoginResponseDto(userData, token);
    } catch (err) {
      if (
        err.name === 'SequelizeUniqueConstraintError' &&
        err.original.constraint === 'user_tab_number_key'
      ) {
        throw new HttpException(
          `User with email '${createUserDto.tab_number}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const tab_number = userLoginRequestDto.tab_number;
    const password = userLoginRequestDto.password;

    const user = await this.getUserByTab(tab_number);
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
    user.tab_number = updateUserDto.tab_number || user.tab_number;
    user.firstname_ru = updateUserDto.firstname_ru || user.firstname_ru;
    user.firstname_en = updateUserDto.firstname_en || user.firstname_en;
    user.lastname_ru = updateUserDto.lastname_ru || user.lastname_ru;
    user.lastname_en = updateUserDto.lastname_en || user.lastname_en;
    user.patronymic_ru = updateUserDto.patronymic_ru || user.patronymic_ru;
    user.patronymic_en = updateUserDto.patronymic_en || user.patronymic_en;
    user.position_id = updateUserDto.position_id || user.position_id;
    user.section_id = updateUserDto.section_id || user.section_id;
    user.state_id = updateUserDto.state_id || user.state_id;
    user.city_id = updateUserDto.city_id || user.city_id;
    user.nomination_id = updateUserDto.nomination_id || user.nomination_id;
    user.count_z = updateUserDto.count_z || user.count_z;
    user.description_ru = updateUserDto.description_ru || user.description_ru;
    user.description_en = updateUserDto.description_en || user.description_en;
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
    console.log(fileImage);
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
      tab_number: user.tab_number,
      role: user.role,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
