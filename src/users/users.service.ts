
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
// import { Mail } from './mail.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from './../shared/config/config.service';
// import randomstring from 'randomstring';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async findAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map(user => new UserDto(user));
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDto(user);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne<User>({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();

      user.email = createUserDto.email.trim().toLowerCase();
      user.name_ru = createUserDto.name_ru;
      user.name_en = createUserDto.name_en;
      user.position_ru = createUserDto.position_ru;
      user.position_en = createUserDto.position_en;
      user.section_ru = createUserDto.section_ru;
      user.section_en = createUserDto.section_en;
      user.state_ru = createUserDto.state_ru;
      user.state_en = createUserDto.state_en;
      user.city_ru = createUserDto.city_ru;
      user.city_en = createUserDto.city_en;
      user.nomination_ru = createUserDto.nomination_ru;
      user.nomination_en = createUserDto.nomination_en;
      user.description_ru = createUserDto.description_ru;
      user.description_en = createUserDto.description_en;


      //   user.gender = createUserDto.gender;
      //   user.birthday = createUserDto.birthday;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);
      // user.code = randomstring.generate();

      const userData = await user.save();

      // when registering then log user in automatically by returning a token
      const token = await this.signToken(userData);
      return new UserLoginResponseDto(userData, token);
    } catch (err) {
      if (
        err.name === 'SequelizeUniqueConstraintError' &&
        err.original.constraint === 'user_email_key'
      ) {
        throw new HttpException(
          `User with email '${createUserDto.email}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
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

    user.name_ru = updateUserDto.name_ru || user.name_ru;
    user.name_en = updateUserDto.name_en || user.name_en;
    user.position_ru = updateUserDto.position_ru || user.position_ru;
    user.position_en = updateUserDto.position_en || user.position_en;
    user.section_ru = updateUserDto.section_ru || user.section_ru;
    user.section_en = updateUserDto.section_en || user.section_en;
    user.state_ru = updateUserDto.state_ru || user.state_ru;
    user.state_en = updateUserDto.state_en || user.state_en;
    user.city_ru = updateUserDto.city_ru || user.city_ru;
    user.city_en = updateUserDto.city_en || user.city_en;
    user.nomination_ru = updateUserDto.nomination_ru || user.nomination_ru;
    user.nomination_en = updateUserDto.nomination_en || user.nomination_en;
    user.description_ru = updateUserDto.description_ru || user.description_ru;
    user.description_en = updateUserDto.description_en || user.description_en;
    user.role = updateUserDto.role || user.role;

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
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }

}
