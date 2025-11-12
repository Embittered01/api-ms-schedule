import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('health')
  health() {
    return this.notificationsService.healthCheck();
  }
}

