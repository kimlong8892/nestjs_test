import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/test')
    findTest(): Promise<UserDto[]> {
        return this.userService.findTest();
    }

    @Post('create')
    createUser(@Body() user: UserDto): Promise<UserDto> {
        return this.userService.save(user);
    }

    @Put(':id')
    updateUserById(
        @Param('id') id: string,
        @Body() user: UserDto,
    ): Promise<{ result: string }> {
        return this.userService.update(id, user);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    deleteUserById(@Param('id') id: string) {
        return this.userService.deleteById(id);
    }

    @Get()
    findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }
}