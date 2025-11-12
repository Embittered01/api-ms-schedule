import { Injectable } from '@nestjs/common';

@Injectable()
export class AgendaService {
  healthCheck() {
    return {
      status: 'ok',
      service: 'agenda',
      timestamp: new Date().toISOString(),
    };
  }
}

