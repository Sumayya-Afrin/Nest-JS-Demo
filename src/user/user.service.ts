/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {

    private users = [
        {
          "id": 1,
          "name": "Alice Smith",
          "email": "alice.smith@example.com",
          "role": "Admin",
        },
        {
          "id": 2,
          "name": "Bob Johnson",
          "email": "bob.johnson@example.com",
          "role": "User",
        },
        {
          "id": 3,
          "name": "Charlie Brown",
          "email": "charlie.brown@example.com",
          "role": "Editor",
        },
        {
          "id": 4,
          "name": "Diana Prince",
          "email": "diana.prince@example.com",
          "role": "User",
        }
      ]


    
      findAll(role?: 'User'|'Editor'|'Admin')
      {
         if(role)
         {
            const rolesArray = this.users.filter((user)=>user.role===role)
            if(rolesArray.length === 0 ) throw new NotFoundException('user role not found')
             return rolesArray 
         }

         return this.users
      }
  
      findOne(id:number)
      {
       const user = this.users.find((user)=>user.id===id)
       if(!user) throw new NotFoundException('user not found')
       return user
      }
      
      create(CreateuserDto : CreateUserDto)
      {
        const userByHighestId = [...this.users].sort((a,b)=> b.id-a.id)
        const newUser = {
          id : userByHighestId[0].id+1,
          ...CreateuserDto
        }

        this.users.push(newUser)
        return newUser
      }

      update(id: number , updateduser : UpdateUserDto)
      {
        this.users=this.users.map((user)=> 
        {
          if(user.id===id)
          {
            return {...user, ...updateduser }
          }
          return user
        })

        return this.findOne(id)
      }


      delete(id : number)
      {
        const removedUser = this.findOne(id)

        this.users=this.users.filter(user=>user.id!=id)

        return  removedUser
      }


      
}
