import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'f6f6vbz5',
  database: 'task_management',
  autoLoadEntities: true,
  synchronize: true,
};
