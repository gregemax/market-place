import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Registreation, RegistreationDocument } from './entities/registreation.entity';
import { CreateRegistreationDto } from './dto/create-registreation.dto';
import { UpdateRegistreationDto } from './dto/update-registreation.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registreation.name) private registrationModel: Model<RegistreationDocument>
  ) {}

  async create(createRegistrationDto: CreateRegistreationDto): Promise<RegistreationDocument> {
    try {
      return await this.registrationModel.create(createRegistrationDto);
    } catch (error) {
      throw new BadRequestException(`Failed to create registration: ${error.message}`);
    }
  }

  async findAll(): Promise<RegistreationDocument[]> {
    try {
      return await this.registrationModel.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch registrations: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<RegistreationDocument> {
    try {
      const registration = await this.registrationModel.findById(id);
      if (!registration) {
        throw new NotFoundException(`Registration with ID ${id} not found`);
      }
      return registration;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch registration: ${error.message}`);
    }
  }

  async update(id: string, updateRegistrationDto: UpdateRegistreationDto): Promise<RegistreationDocument> {
    try {
      const registration = await this.registrationModel.findByIdAndUpdate(
        id,
        updateRegistrationDto,
        { new: true }
      );
      if (!registration) {
        throw new NotFoundException(`Registration with ID ${id} not found`);
      }
      return registration;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update registration: ${error.message}`);
    }
  }

  async remove(id: string): Promise<RegistreationDocument> {
    try {
      const registration = await this.registrationModel.findByIdAndDelete(id);
      if (!registration) {
        throw new NotFoundException(`Registration with ID ${id} not found`);
      }
      return registration;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete registration: ${error.message}`);
    }
  }
}