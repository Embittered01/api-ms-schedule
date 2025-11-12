import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  healthCheck() {
    return {
      status: 'ok',
      service: 'notifications',
      timestamp: new Date().toISOString(),
    };
  }
}

