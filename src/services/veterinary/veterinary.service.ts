import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Veterinary, VeterinaryDocument } from './entities/veterinary.entity';
import { Model } from 'mongoose';

@Injectable()
export class VeterinaryService {
  constructor(
    @InjectModel(Veterinary.name) private veterinaryModel: Model<VeterinaryDocument>
  ) {}

  async create(createVeterinaryDto: CreateVeterinaryDto): Promise<VeterinaryDocument> {
    try {
      return await this.veterinaryModel.create(createVeterinaryDto);
    } catch (error) {
      throw new Error(`Failed to create veterinary: ${error.message}`);
    }
  }

  async findAll(): Promise<VeterinaryDocument[]> {
    try {
      return await this.veterinaryModel.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Failed to fetch veterinaries: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<VeterinaryDocument> {
    try {
      const veterinary = await this.veterinaryModel.findById(id);
      if (!veterinary) {
        throw new NotFoundException(`Veterinary with ID ${id} not found`);
      }
      return veterinary;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch veterinary: ${error.message}`);
    }
  }

  async update(id: string, updateVeterinaryDto: UpdateVeterinaryDto): Promise<VeterinaryDocument> {
    try {
      const veterinary = await this.veterinaryModel.findByIdAndUpdate(
        id,
        updateVeterinaryDto,
        { new: true }
      );
      if (!veterinary) {
        throw new NotFoundException(`Veterinary with ID ${id} not found`);
      }
      return veterinary;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update veterinary: ${error.message}`);
    }
  }

  async remove(id: string): Promise<VeterinaryDocument> {
    try {
      const veterinary = await this.veterinaryModel.findByIdAndDelete(id);
      if (!veterinary) {
        throw new NotFoundException(`Veterinary with ID ${id} not found`);
      }
      return veterinary;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete veterinary: ${error.message}`);
    }
  }
}