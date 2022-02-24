import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose'
import { SchemaUser } from '../schema/users.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: SchemaUser }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
