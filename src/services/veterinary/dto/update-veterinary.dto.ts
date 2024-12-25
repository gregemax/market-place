import { PartialType } from '@nestjs/mapped-types';
import { CreateVeterinaryDto } from './create-veterinary.dto';

export class UpdateVeterinaryDto extends PartialType(CreateVeterinaryDto) {}
