import { Controller, Get } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller({
  path: 'clients',
  version: '1',
})
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('health')
  checkHealth() {
    return this.clientsService.healthCheck();
  }
}

