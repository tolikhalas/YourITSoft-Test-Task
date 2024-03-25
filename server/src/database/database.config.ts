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
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  entities: [Todo],
  synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
});
