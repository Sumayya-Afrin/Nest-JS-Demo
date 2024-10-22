/* eslint-disable prettier/prettier */

import { IsEmail , IsEnum , IsNotEmpty , IsString} from "class-validator";
export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsEmail()
    email: string;

    @IsEnum(['User','Editor', 'Admin'],
        {
            message: 'Valid role required'
        }
    )
    role : 'User'|'Editor'|'Admin';
}