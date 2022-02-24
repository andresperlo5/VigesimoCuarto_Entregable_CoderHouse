import { Body, Controller, Delete, Get, Param, Post, Res, HttpStatus, NotFoundException, Put } from '@nestjs/common';
import { CreateUsersDto } from '../dto/create-users-dto'
import { UsersService } from './users.service'
import { Users } from '../interface/users.interface'
import * as bcryptjs from 'bcrypt'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('/')
    async create(@Res() res, @Body() createUser: CreateUsersDto) {
        try {
            let { username, password } = createUser

            const userExist = await this.userService.getUserName(username)
            if (userExist) {
                res.status(400).json({ msg: 'Usuario no disponible' })
            }

            const salt = await bcryptjs.genSalt(10);
            password = await bcryptjs.hash(password, salt);

            const RegisterUser = {
                username,
                password,
                token: []
            }

            this.userService.create(RegisterUser)
            res.status(201).json({ msg: 'Usuario Creado', createUser })
        } catch (err) {
            res.status(500).json(err)
        }
    }
    @Post('/login')
    async login(@Res() res, @Body() createUser: CreateUsersDto): Promise<Users> {
        try {
            let { username, password } = createUser
            
            const userLogin = await this.userService.getUserName(username)
            if (!userLogin) {
                return res.status(400).json({ msg: 'Usuario y/o Contraseña Incorrectos' })
            }

            const passCheck = await bcryptjs.compare(password, userLogin.password);
            if (!passCheck) {
                return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
            }

        } catch (error) {
            res.status(500).json(error)
        }

    }
    @Get('/logout')
    logout(@Res() res) {

    }
    @Get('/')
    finAllUsers(): Promise<Users[]> {
        return this.userService.getAllUsers()
    }
    @Get('/:id')
    findOneUser(@Param('id') id): Promise<Users> {
        return this.userService.getUser(id)
    }
    @Put('/:id')
    updateUser(@Param('id') id, @Body() createUser: CreateUsersDto): Promise<Users> {
        return this.userService.updateUser(id, createUser)
    }
    @Delete('/:id')
    deleteUser(@Param('id') id): Promise<Users> {
        return this.userService.deleteUser(id)
    }
} 