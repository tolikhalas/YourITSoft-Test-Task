import { Module } from '@nestjs/common';
import { TodoLogger } from './logger.provider';

@Module({
  providers: [TodoLogger],
  exports: [TodoLogger],
})
export class LoggerModule {}
