import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';
@Controller('boards')
export class BoardController {
  // importtas los servicios que se van a utilizar
  constructor(private readonly boardService: BoardService) {}


  @Get('dummy')
  async dummyFunction() {
    return this.boardService.dummyFunction(); // Llama al método dummyFunction del servicio TrainingService
  }

}
