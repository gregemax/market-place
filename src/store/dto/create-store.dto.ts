import { IsString } from "class-validator";

export class CreateStoreDto {
    @IsString()
    name: string;
    
    
    @IsString()
    description?: string;
    
    
    @IsString()
    address: string;
}
