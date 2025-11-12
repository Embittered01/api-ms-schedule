import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  healthCheck() {
    return {
      status: 'ok',
      service: 'services',
      timestamp: new Date().toISOString(),
    };
  }
}

