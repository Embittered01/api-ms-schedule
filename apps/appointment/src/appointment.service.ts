import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  healthCheck() {
    return {
      status: 'ok',
      service: 'appointment',
      timestamp: new Date().toISOString(),
    };
  }
}

