import { Controller, Get } from 'routing-controllers';

@Controller('/')
export class HomeController {
  @Get()
  async get() {
    return 'Hello Word';
  }
}
