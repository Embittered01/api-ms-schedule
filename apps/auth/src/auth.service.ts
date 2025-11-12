import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  healthCheck() {
    return {
      status: 'ok',
      service: 'auth',
      timestamp: new Date().toISOString(),
    };
  }
}

