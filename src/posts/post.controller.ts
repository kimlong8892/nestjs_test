import {
    Body,
    Controller,
    Delete,
    Get, HttpStatus,
    Param, ParseIntPipe,
    Post,
    Put, Query, Res, UseInterceptors,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import {Response} from 'express';
import {ForbiddenException} from "../exception/forbidden.exception";
import {InternalServerErrorException} from "../exception/internalservererror.exception";
import {LoggingInterceptor} from "../interceptor/logging.interceptor";

@Controller('users')
//@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/test')
    findTest(
        @Query('page') page: number = 1,
        @Query('per_page') per_page: number = 10
    ) {
        return this.userService.findTest(page, per_page);
        // res.status(HttpStatus.OK).json({
        //     count: result.length,
        //     result: result
        // });
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