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
      include: [{
        model: State,
        as: 'state'
      }],
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
      include: [{
        model: State,
        as: 'state'
      }],
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
    try {
      const resp = await this.usersRepository.findOne<User>({
        include: [{
          model: State,
          as: 'state'
        }],
        where: { tabNumber },
      });
      return resp;
    } catch (e) {
      console.log('[ERROR-getuserByTab]', e)
      throw new BadRequestException(e);
    }
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
      user.cityNameEng = createUserDto.cityNameEng;
      user.positionNameEng = createUserDto.positionNameEng;
      user.sectionNameEng = createUserDto.sectionNameEng;
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
        const HTMLText = `
<i>English text is below</i>
<br /><br />
Уважаемый коллега,
<br /><br />
Направляем Вам  персональный пароль для доступа на сайт www.vtaward.ru , на который вы сможете зайти в любое удобное для вас время с компьютера или смартфона, на работе или из дома.
<br /><br />
Логин (ваш табельный номер): ${tabNumber}<br />
Пароль: ${user.passwordText}<br />
<br />
<div style="color: red">
Прием заявок на участие в конкурсе «Лидер перемен ВТ - 2020» <br />
<b>НАЧАЛО: 28 СЕНТЯБРЯ</b><br />
<b>ЗАВЕРШЕНИЕ: 18 ОКТЯБРЯ</b> (до конца дня)<br />
</div>
<br />
Ждем Вас на нашем сайте www.vtaward.ru !<br />
<hr />
Dear colleague,
<br /><br />
Below are the details how to get access the site www.vtaward.ru.<br />
<br />
Login (your Employee ID): ${tabNumber}<br />
Password: ${user.passwordText}<br />
<br /><br />
<div style="color: red">
Application process for VT Change Maker 2020 Contest:<br />
<b>START: 28 SEPTEMBER,</b><br />
<b>CLOSURE: 18 OCTOBER</b> (by the end on the day)<br />
</div>
<br />
Welcome to our web site www.vtaward.ru !
        `;
        await this.mailService.sendEWS({
          userTo: user.email,
          userFrom: 'vtaward@vost-tech.ru',
          text: HTMLText
        });
        return true;
      } catch (e) {
        throw new BadRequestException(e)
      }
    }
  }


  async postPass(adminPass: string): Promise<boolean> {
    if (adminPass !== 'AdminPass') return false;

    try {
      const dataArr = await this.findAll();

      dataArr.forEach(async (item) => {
        const resp = await this.responsePassword(item.tabNumber);
        console.log({
          '[TABN]:': item.tabNumber,
          '[SEND]:': resp
        });
      })
      return true;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
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
    user.cityNameEng = updateUserDto.cityNameEng || user.cityNameEng;
    user.positionNameEng = updateUserDto.positionNameEng || user.positionNameEng;
    user.sectionNameEng = updateUserDto.sectionNameEng || user.sectionNameEng;
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


  async changeFieldsById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const userOld = await this.getUserById(id);
      if (!userOld) {
        throw new HttpException('User is not found.', HttpStatus.NOT_FOUND);
      }

      updateUserDto = {
        email: updateUserDto.email || userOld.email,
        tabNumber: updateUserDto.tabNumber || userOld.tabNumber,
        firstnameRu: updateUserDto.firstnameRu || userOld.firstnameRu,
        firstnameEn: updateUserDto.firstnameEn || userOld.firstnameEn,
        lastnameRu: updateUserDto.lastnameRu || userOld.lastnameRu,
        lastnameEn: updateUserDto.lastnameEn || userOld.lastnameEn,
        patronymicRu: updateUserDto.patronymicRu || userOld.patronymicRu,
        patronymicEn: updateUserDto.patronymicEn || userOld.patronymicEn,
        stateId: updateUserDto.stateId || userOld.stateId,
        role: updateUserDto.role || userOld.role,
        img: userOld.img,
        positionName: updateUserDto.positionName || userOld.positionName,
        cityName: updateUserDto.cityName || userOld.cityName,
        sectionName: updateUserDto.sectionName || userOld.sectionName,
        positionNameEng: updateUserDto.positionNameEng || userOld.positionNameEng,
        cityNameEng: updateUserDto.cityNameEng || userOld.cityNameEng,
        sectionNameEng: updateUserDto.sectionNameEng || userOld.sectionNameEng,
        passwordText: userOld.passwordText
      }

      await User.update(updateUserDto, { where: {id}});

      return await this.getUserById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      return this.usersRepository.findByPk<User>(
        id,
        {
          include: [
            {
              model: State,
              as: 'state',
            },
          ],
          order: [
            ['id', 'ASC'],
          ],
        });
    } catch (e) {
      throw new BadRequestException(e)
    }
  }
}
