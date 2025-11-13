import { Controller, Get } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller({
  path: 'appointment',
  version: '1',
})
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('health')
  checkHealth() {
    return this.appointmentService.healthCheck();
  }
}

