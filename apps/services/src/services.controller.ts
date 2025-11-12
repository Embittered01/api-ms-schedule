import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller({
  path: 'services',
  version: '1',
})
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('health')
  checkHealth() {
    return this.servicesService.healthCheck();
  }
}

