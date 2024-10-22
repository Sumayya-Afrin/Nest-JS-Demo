/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post ,Delete, Query  , ParseIntPipe , ValidationPipe} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor( private readonly usersService : UserService) {}

    @Get()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll(@Query('role') role?: 'User'|'Editor'|'Admin')
    {
        return this.usersService.findAll(role)
    }



    @Get('interns')
    findAllInterns()
    {
       return []
    }
 
    @Get(':id')//user/id
    findOne(@Param('id' , ParseIntPipe) id:number)
    {
       return this.usersService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe)  CreateuserDto : CreateUserDto )
    {
        return this.usersService.create(CreateuserDto)
    }

    
    @Patch(':id')
    update(@Param('id' , ParseIntPipe) id:number, @Body(ValidationPipe) UpdateserDto : UpdateUserDto)
    {
        return this.usersService.update(id ,UpdateserDto )
    }


    @Delete(':id')
    delete(@Param('id' , ParseIntPipe) id:number)
    {
        return this.usersService.delete(id)
    }




}
  
   

