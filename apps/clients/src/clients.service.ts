import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientsService {
  healthCheck() {
    return {
      status: 'ok',
      service: 'clients',
      timestamp: new Date().toISOString(),
    };
  }
}

