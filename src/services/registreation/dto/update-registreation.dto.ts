import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistreationDto } from './create-registreation.dto';

export class UpdateRegistreationDto extends PartialType(CreateRegistreationDto) {}
