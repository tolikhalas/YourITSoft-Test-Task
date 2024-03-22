import { Module } from '@nestjs/common';
import { CustomLogger } from './logger.provider';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
