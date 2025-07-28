import { JsonController, Get } from 'routing-controllers';

@JsonController('/')
export class HomeController {
  @Get()
  async get() {
    return 'Hello Word';
  }
}
