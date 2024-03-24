import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Todo } from '../todo/entities/todo.entity';

// Database Config
export const DatabaseModuleConfig: (
  ...args: any[]
) => Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions = async (
  configService: ConfigService,
) => ({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  database: configService.getOrThrow('DB_DATABASE'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  entities: [Todo],
  synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
});
