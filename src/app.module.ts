import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [UsersModule, SharedModule, ConfigModule.forRoot()],
    controllers: [],
    providers: [],
})
export class AppModule {}
