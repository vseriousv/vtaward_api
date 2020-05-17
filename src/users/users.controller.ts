import { UserLoginRequestDto } from './dto/user-login-request.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Delete,
  Req,
  UseGuards,
  Put,
  Param, UseInterceptors, HttpException, HttpStatus, UploadedFile,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from 'path';
import { ForgotPasswordRequestDto } from './dto/forgot-password-request.dto';
import { UserCodeResponseDto } from './dto/user-code-response.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOkResponse({ type: UserLoginResponseDto })
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: UserLoginResponseDto })
  login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.login(userLoginRequestDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('committee')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  findAllCommittee(): Promise<UserDto[]> {
    return this.usersService.findAllCommittee();
  }

  @Get('check')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async check(): Promise<Object> {
    return { result: true };
  }

  @Post('admin_forgot_password')
  @ApiOkResponse({ type: UserDto })
  adminForgotPassword(@Body() forgotPasswordRequestDto: ForgotPasswordRequestDto,
  ):Promise<UserCodeResponseDto> {
    return this.usersService.forgotPasswordForAdmin(forgotPasswordRequestDto);
  }

  @Post('avatar')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../files/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      }),
      fileFilter: (req, file, cb) => {
        const allow = ['image/jpeg', 'image/pjpeg', 'image/png'];

        if (!allow.includes(file.mimetype)) {
          return cb(
            new HttpException(
              {
                status: 'error',
                message: 'Incorrect type of file',
              },
              HttpStatus.BAD_REQUEST,
            ),
            null,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(
    @Body() id: number,
    @UploadedFile() file
  ): Promise<UserDto> {
    return this.usersService.updateAvatar(JSON.parse(JSON.stringify(id)).id, file.filename);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  async getUser(@Param('id') id): Promise<UserDto> {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  delete(@Param('id') id): Promise<UserDto> {
    return this.usersService.delete(id);
  }
}
