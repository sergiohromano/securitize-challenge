import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [AuthModule, UsersModule, DrizzleModule, WalletsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
