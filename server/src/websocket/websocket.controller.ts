import { Controller, Get, HttpStatus, Logger } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { WebsocketClientsDto } from './dto/websocket.dto';
import { WebsocketService } from './websocket.service';

@Controller('server')
export class WebsocketController {
    private logger: Logger = new Logger('WebsocketController');

    constructor(private websocketService: WebsocketService) {}

    @Get('clients')
    @ApiResponse({ status: HttpStatus.OK, type: WebsocketClientsDto, description: 'Get number of online clients' })
    findOnlineClients(): WebsocketClientsDto {
        const number = this.websocketService.getOnlineClients();
        this.logger.debug(`${number} clients online`);
        return { onlineClients: number };
    }
}
