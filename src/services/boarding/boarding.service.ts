import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardingDto } from '../boarding/dto/create-boarding.dto';
import { UpdateBoardingDto } from './dto/update-boarding.dto';
import { Boarding, BoardingDocument } from './entities/boarding.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BoardingService {
  constructor(
    @InjectModel(Boarding.name) private boardingModel: Model<BoardingDocument>
  ) {}

  async create(createBoardingDto: CreateBoardingDto): Promise<BoardingDocument> {
    try {
      return await this.boardingModel.create(createBoardingDto);
    } catch (error) {
      throw new BadRequestException(`Failed to create boarding: ${error.message}`);
    }
  }

  async findAll(): Promise<BoardingDocument[]> {
    try {
      return await this.boardingModel.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch boardings: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<BoardingDocument> {
    try {
      const boarding = await this.boardingModel.findById(id);
      if (!boarding) {
        throw new NotFoundException(`Boarding with ID ${id} not found`);
      }
      return boarding;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch boarding: ${error.message}`);
    }
  }

  async update(id: string, updateBoardingDto: UpdateBoardingDto): Promise<BoardingDocument> {
    try {
      const boarding = await this.boardingModel.findByIdAndUpdate(
        id,
        updateBoardingDto,
        { new: true }
      );
      if (!boarding) {
        throw new NotFoundException(`Boarding with ID ${id} not found`);
      }
      return boarding;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update boarding: ${error.message}`);
    }
  }

  async remove(id: string): Promise<BoardingDocument> {
    try {
      const boarding = await this.boardingModel.findByIdAndDelete(id);
      if (!boarding) {
        throw new NotFoundException(`Boarding with ID ${id} not found`);
      }
      return boarding;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete boarding: ${error.message}`);
    }
  }
}