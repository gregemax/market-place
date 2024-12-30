import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDTO } from './create-order.dto';
import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateOrderDto extends PartialType(CreateOrderDTO) {
    @Optional()
    status:string
}
