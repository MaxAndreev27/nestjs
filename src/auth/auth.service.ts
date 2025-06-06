import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}
    async createUser(dto: AuthDto): Promise<User> {
        const salt = genSaltSync(10);
        const newUser = new this.userModel({
            email: dto.login,
            password: hashSync(dto.password, salt),
        });
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | null> {
        return this.userModel.findOne({ _id: id }).exec();
    }

    async findUser(email: string): Promise<User | null> {
        return this.userModel.findOne({ email: email }).exec();
    }

    async delete(id: string): Promise<User | null> {
        return await this.userModel.findByIdAndDelete({ _id: id }).exec();
    }
}
