import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {}
export class loginAuthDto {
    @IsString()
    @MinLength(4)
    password:string

    @IsEmail()
    @IsString()
    email:string
}
