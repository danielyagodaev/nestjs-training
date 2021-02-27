import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('get all tasks', () => {
      const allTasks = tasksService.getAllTasks();
      expect(allTasks).toEqual([]);
    });
  });
});
