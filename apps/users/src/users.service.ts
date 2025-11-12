import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  healthCheck() {
    return {
      status: 'ok',
      service: 'users',
      timestamp: new Date().toISOString(),
    };
  }
}

