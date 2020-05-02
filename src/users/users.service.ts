
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
      user.tab_number = createUserDto.tab_number;
      user.name_ru = createUserDto.name_ru;
      user.name_en = createUserDto.name_en;
      user.position_id = createUserDto.position_id;
      user.section_id = createUserDto.section_id;
      user.state_id = createUserDto.state_id;
      user.city_id = createUserDto.city_id;
      user.nomination_id = createUserDto.nomination_id;
      user.description_ru = createUserDto.description_ru;
      user.description_en = createUserDto.description_en;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);

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

    user.tab_number = updateUserDto.tab_number || user.tab_number;
    user.name_ru = updateUserDto.name_ru || user.name_ru;
    user.name_en = updateUserDto.name_en || user.name_en;
    user.position_id = updateUserDto.position_id || user.position_id;
    user.section_id = updateUserDto.section_id || user.section_id;
    user.state_id = updateUserDto.state_id || user.state_id;
    user.city_id = updateUserDto.city_id || user.city_id;
    user.nomination_id = updateUserDto.nomination_id || user.nomination_id;
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
