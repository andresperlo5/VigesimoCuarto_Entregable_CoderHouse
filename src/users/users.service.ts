import { Injectable } from '@nestjs/common';
import { Users } from '../interface/users.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUsersDto } from 'src/dto/create-users-dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<Users>) { }

    async create(createUserDto: CreateUsersDto): Promise<Users> {
        try {
            const newuser = new this.userModel(createUserDto)
            return await newuser.save()
        } catch (error) {
            return error
        }
    }
    async getAllUsers(): Promise<Users[]> {
        const allUsers = await this.userModel.find()
        return allUsers
    }
    async getUser(id: string): Promise<Users> {
        const oneUser = await this.userModel.findById(id)
        return oneUser
    }
    async updateUser(id: string, createUserDto: CreateUsersDto): Promise<Users> {
        const updateUser = await this.userModel.findByIdAndUpdate(id, createUserDto, { new: true })
        return updateUser
    }
    async deleteUser(id: string): Promise<Users> {
        const userDel = await this.userModel.findByIdAndDelete(id)
        return userDel
    }
    async getUserName(username: string): Promise<Users> {
        const getUserName = await this.userModel.findOne({ username })
        return getUserName
    }
}
