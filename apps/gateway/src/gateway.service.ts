import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { AxiosError, Method } from 'axios';
import { lastValueFrom } from 'rxjs';

type ServiceKey =
  | 'users'
  | 'clients'
  | 'services'
  | 'agenda'
  | 'auth'
  | 'notifications';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  private readonly serviceMap: Record<ServiceKey, string>;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceMap = {
      users: this.configService.get<string>('services.usersUrl')!,
      clients: this.configService.get<string>('services.clientsUrl')!,
      services: this.configService.get<string>('services.catalogUrl')!,
      agenda: this.configService.get<string>('services.agendaUrl')!,
      auth: this.configService.get<string>('services.authUrl')!,
      notifications: this.configService.get<string>(
        'services.notificationsUrl',
      )!,
    };
  }

  async forwardRequest(req: Request, res: Response): Promise<void> {
    const [segment] = req.path.replace(/^\/+/, '').split('/');
    const serviceKey = segment as ServiceKey;

    if (!serviceKey || !this.serviceMap[serviceKey]) {
      throw new NotFoundException(`No service mapped for path ${req.path}`);
    }

    const targetBase = this.serviceMap[serviceKey];
    const targetUrl = `${targetBase}${req.originalUrl}`;

    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method: req.method as Method,
          url: targetUrl,
          headers: this.buildHeaders(req),
          data: req.body,
        }),
      );

      this.logger.debug(
        `Forwarded ${req.method} ${req.originalUrl} -> ${targetUrl} (${response.status})`,
      );

      res
        .status(response.status)
        .set(response.headers as Record<string, string>)
        .send(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status ?? 502;
      const data = axiosError.response?.data ?? {
        message: 'Upstream request failed',
      };
      this.logger.error(
        `Error forwarding ${req.method} ${req.originalUrl} -> ${targetUrl}: ${axiosError.message}`,
      );
      res.status(status).send(data);
    }
  }

  private buildHeaders(req: Request) {
    const headers = { ...req.headers } as Record<string, string>;
    // Remove headers that should not be forwarded or set explicitly
    delete headers.host;
    return headers;
  }
}

