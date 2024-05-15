/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CodeforcesService } from './codeforces/codeforces.service';
import { CodeforcesController } from './codeforces/codeforces.controller';
import { ChatLogModule } from './chatLog/chatlog.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ChatLogModule,
    ImagesModule,
    TeamModule,
  ],
  controllers: [CodeforcesController],
  providers: [CodeforcesService],
})
export class AppModule {}
