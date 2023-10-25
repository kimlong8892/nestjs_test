import {Controller, Get, HttpStatus, Param, Query, Res} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('abc/:id/:slug')
  getTest(
      @Param('id') id: bigint,
      @Param('slug') slug: string,
      @Query() query: object,
      @Res() res: Response
  ) {
      res.status(HttpStatus.OK).json({
          id: id,
          slug: slug,
          name: 123,
          description: 456,
          query: query
      });
  }
}
