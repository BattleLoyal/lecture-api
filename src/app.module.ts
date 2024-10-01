import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureModule } from './lecture/lecture.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SpecialLecture } from './lecture/special-lecture.entity';
import { Lecture } from './lecture/lecture.entity';

@Module({
  imports: [
    LectureModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Lecture, SpecialLecture]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
