import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { HoraService } from './hora.service';

@WebSocketGateway({ 
  cors: { origin: '*' },
  transports: ['websocket', 'polling']
})
export class HoraGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  
  private logger = new Logger('HoraGateway');
  private connectedClients = new Set<string>();

  constructor(private readonly horaService: HoraService) {}

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
    this.logger.log(`Cliente conectado: ${client.id} (Total: ${this.connectedClients.size})`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.logger.log(`Cliente desconectado: ${client.id} (Total: ${this.connectedClients.size})`);
  }

  @SubscribeMessage('iniciarHora')
  async handleIniciarHora(@MessageBody() data: { atividade_id: number; freelancer_id: number }) {
    try {
      if (!data.atividade_id || typeof data.atividade_id !== 'number') {
        return { success: false, error: 'atividade_id inválido' };
      }

      if (!data.freelancer_id || typeof data.freelancer_id !== 'number') {
        return { success: false, error: 'freelancer_id inválido' };
      }

      const hora = await this.horaService.create(data);

      this.server.emit('horaUpdate', {
        hora_id: hora.id,
        atividade_id: hora.atividade_id,
        freelancer_id: hora.freelancer_id,
        status: 'iniciado',
        inicio: hora.inicio,
      });

      this.logger.log(`Hora iniciada: ID ${hora.id} - Atividade ${data.atividade_id}, Freelancer ${data.freelancer_id}`);

      return { success: true, hora };
    } catch (error: any) {
      this.logger.error(`Erro ao iniciar hora: ${error.message}`);
      return { success: false, error: error.message || 'Erro ao iniciar hora' };
    }
  }

  @SubscribeMessage('pararHora')
  async handlePararHora(@MessageBody() data: { hora_id: number }) {
    try {
      if (!data.hora_id || typeof data.hora_id !== 'number') {
        return { success: false, error: 'hora_id inválido' };
      }

      const hora = await this.horaService.parar(data.hora_id);

      this.server.emit('horaUpdate', {
        hora_id: hora.id,
        atividade_id: hora.atividade_id,
        freelancer_id: hora.freelancer_id,
        status: 'parado',
        tempo_total: hora.tempo_total,
      });

      this.logger.log(`Hora parada: ID ${hora.id} (${hora.tempo_total}s)`);

      return { success: true, hora };
    } catch (error: any) {
      this.logger.error(`Erro ao parar hora: ${error.message}`);
      return { success: false, error: error.message || 'Erro ao parar hora' };
    }
  }

  @SubscribeMessage('getHorasAtivas')
  async handleGetHorasAtivas() {
    try {
      const horas = await this.horaService.findAtivas();
      return { success: true, horas };
    } catch (error: any) {
      this.logger.error(`Erro ao buscar horas ativas: ${error.message}`);
      return { success: false, error: 'Erro ao buscar horas ativas' };
    }
  }
}
