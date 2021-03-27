import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filters.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { LoggerService } from '../logger/logger.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) tasksFilter: GetTasksFiltersDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.info(`Received request for get tasks`);
    return this.tasksService.getTasks(tasksFilter, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.info(`Received request for get task with ID [${id}]`);
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.info(`Received request for create task`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.info(`Received request for deleteTask with ID [${id}]`);
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.info(
      `Received request for update task status with ID [${id}] and status ${status}`,
    );
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
