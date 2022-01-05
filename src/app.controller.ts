import { Controller, Get, Render } from '@nestjs/common';
import { get } from 'http';

@Controller()
export class AppController {
  constructor() {}
  @Get()
  @Render('index')
  root() {
    return {
      data: {
        title: 'test',
        describe: 'it is test page',
      },
    };
  }
}
