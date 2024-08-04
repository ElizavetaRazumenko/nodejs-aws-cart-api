import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { v4 } from 'uuid';
import { User } from '../models';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createOne({ name, password }: User) {
    const newUser = this.userRepository.create({
      name, password
    });
    const user = await this.userRepository.save(newUser);

    return user;
  }

  async findOne(name: string) {
    return await this.userRepository.findOne({
      where: {
        name
      }
    });
  }

}
