import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { training, trainingDocument } from "./entities/training.entity";
import { Model } from "mongoose";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(training.name) private trainingModel: Model<trainingDocument>
  ) {}

  async create(createTrainingDto: CreateTrainingDto): Promise<trainingDocument> {
    try {
      return await this.trainingModel.create(createTrainingDto);
    } catch (error) {
      throw new BadRequestException(`Failed to create training: ${error.message}`);
    }
  }

  async findAll(): Promise<trainingDocument[]> {
    try {
      return await this.trainingModel.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch trainings: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<trainingDocument> {
    try {
      const training = await this.trainingModel.findById(id);
      if (!training) {
        throw new NotFoundException(`Training with ID ${id} not found`);
      }
      return training;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch training: ${error.message}`);
    }
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto): Promise<trainingDocument> {
    try {
      const training = await this.trainingModel.findByIdAndUpdate(
        id,
        updateTrainingDto,
        { new: true }
      );
      if (!training) {
        throw new NotFoundException(`Training with ID ${id} not found`);
      }
      return training;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update training: ${error.message}`);
    }
  }

  async remove(id: string): Promise<trainingDocument> {
    try {
      const training = await this.trainingModel.findByIdAndDelete(id);
      if (!training) {
        throw new NotFoundException(`Training with ID ${id} not found`);
      }
      return training;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete training: ${error.message}`);
    }
  }
}