import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async save(userDto: UserDto): Promise<UserDto> {
        const saveUser = await this.userRepository.save(userDto);
        return plainToInstance(UserDto, saveUser, {
            excludeExtraneousValues: true,
        });
    }

    async update(id: string, userDto: UserDto): Promise<{ result: string }> {
        const updateUser = await this.userRepository.update(id, userDto);
        return { result: 'success' };
    }

    async findOne(id: string): Promise<UserDto> {
        const firstUser = await this.userRepository
            .createQueryBuilder('users')
            .where('users.id = :id', { id: id })
            .getOne();
        return plainToInstance(UserDto, firstUser, {
            excludeExtraneousValues: true,
        });
    }

    async deleteById(id: string): Promise<{ result: string }> {
        const deleteUser = await this.userRepository.delete(id);
        return { result: 'delete success' };
    }

    async findAll(): Promise<UserDto[]> {
        const findAll = await this.userRepository.find();
        return plainToInstance(UserDto, findAll, {
            excludeExtraneousValues: true,
        });
    }

    async findTest(page: number = 1, per_page: number = 5) {
        // for (let i = 1; i < 500; ++i) {
        //     const userTest = new UserDto();
        //     userTest.first_name = "Long " + i;
        //     userTest.last_name = "Long " + i;
        //     userTest.id = i;
        //     userTest.full_name = "Test";
        //     userTest.is_active = !Math.round(Math.random());
        //     await this.save(userTest);
        // }

        // let [listNoneActive, ListActive] = await Promise.all([
        //     this.userRepository
        //         .createQueryBuilder('users')
        //         .where("users.is_active = :is_active", {is_active: 0})
        //         .getMany(),
        //     this.userRepository
        //         .createQueryBuilder('users')
        //         .where("users.is_active = :is_active", {is_active: 1})
        //         .getMany()
        // ]);



        return this.userRepository.find({
            skip: (page - 1) * per_page,
            take: per_page
        });

        //return listNoneActive.concat(ListActive);
    }
}