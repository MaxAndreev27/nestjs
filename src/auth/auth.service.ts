import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
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

    async findById(id: string): Promise<User | null> {
        return this.userModel.findOne({ _id: id }).exec();
    }

    async findUser(email: string): Promise<User | null> {
        return this.userModel.findOne({ email: email }).exec();
    }

    async delete(id: string): Promise<User | null> {
        return await this.userModel.findByIdAndDelete({ _id: id }).exec();
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<Pick<User, 'email'>> {
        const user = await this.findUser(email);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND);
        }
        const isCorrectPassword = await compare(password, user.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        return { email: user.email };
    }

    async login(email: string) {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
