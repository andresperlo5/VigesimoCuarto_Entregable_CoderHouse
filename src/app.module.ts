import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
    MessageModule,
    MongooseModule.forRoot('mongodb+srv://admin:7I75j9URMEnc6KST@cluster0.t2zbn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
