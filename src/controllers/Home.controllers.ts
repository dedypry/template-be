import { HomeService } from '@/services/Home.service';
import { JsonController, Get } from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
@JsonController('/')
export class HomeController {
  constructor(@Inject() private homeService: HomeService){}

  @Get()
  async get() {
    return this.homeService.hello()
  }
}
