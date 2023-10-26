import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query, Res,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import {Response} from 'express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/test')
    async findTest(
        @Query('page') page: number,
        @Query('per_page') per_page: number,
        @Res() res: Response
    ) {
        const result = await this.userService.findTest(page, per_page);

        res.status(200).json({
            count: result.length,
            result: result
        });
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