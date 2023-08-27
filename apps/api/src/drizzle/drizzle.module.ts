import { Module } from '@nestjs/common';
import { drizzleProviders } from './drizzle.provider';

@Module({
  providers: [...drizzleProviders],
  exports: [...drizzleProviders],
})
export class DrizzleModule {}
