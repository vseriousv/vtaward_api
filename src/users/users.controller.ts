import { UserLoginRequestDto } from './dto/user-login-request.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param, Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TabNumberPassUserDto } from './dto/tab-number-pass-user.dto';
import { PassFollowingUserDto } from './dto/pass-following-user.dto';

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

  @Post('pass-email')
  responsePassword(
    @Body() tabNumberPassUserDto: TabNumberPassUserDto
  ): Promise<boolean> {
    return this.usersService.responsePassword(tabNumberPassUserDto.tabNumber)
  }

  @Post('pass-following')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  postPass(
    @Body() passFollowingUserDto: PassFollowingUserDto
  ): Promise<boolean> {
    return this.usersService.postPass(passFollowingUserDto)
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
  async check(): Promise<Record<any, any>> {
    return { result: true };
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

  @ApiParam({ name: 'id', description: 'user id' })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  async getUser(@Param('id') id): Promise<UserDto> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  changeUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id,
  ): Promise<UserDto> {
    return this.usersService.changeFieldsById(id, updateUserDto);
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
