import { Inject, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { currency } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CurrenciesService {
  constructor(@Inject('DB_CONNECTION') private db: PostgresJsDatabase) {}

  create(createCurrencyDto: CreateCurrencyDto) {
    return this.db.insert(currency).values({
      name: createCurrencyDto.name,
      symbol: createCurrencyDto.symbol,
      price: createCurrencyDto.price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  findAll() {
    return this.db.select().from(currency);
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.db.update(currency).set({
      name: updateCurrencyDto.name,
      symbol: updateCurrencyDto.symbol,
      price: updateCurrencyDto.price,
    }).where(eq(currency.id,id));
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
