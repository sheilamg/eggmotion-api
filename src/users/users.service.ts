// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(name: string, email: string, password: string, role: UserRole = UserRole.USER,): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ 
        name, email, password: hashed, role, });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async validatePassword(user: User, pass: string): Promise<boolean> {
    return bcrypt.compare(pass, user.password);
  }
}
