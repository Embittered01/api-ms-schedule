import { Controller, Get } from '@nestjs/common';
import { AgendaService } from './agenda.service';

@Controller({
  path: 'agenda',
  version: '1',
})
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Get('health')
  checkHealth() {
    return this.agendaService.healthCheck();
  }
}

