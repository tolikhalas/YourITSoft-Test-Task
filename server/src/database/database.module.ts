import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModuleConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseModuleConfig,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
