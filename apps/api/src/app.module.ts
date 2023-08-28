import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { WalletsModule } from './wallets/wallets.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { validationSchemaForEnv } from './config/environment-variables';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
      load: [config],
    }),
    AuthModule,
    UsersModule,
    DrizzleModule,
    WalletsModule,
    CurrenciesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
