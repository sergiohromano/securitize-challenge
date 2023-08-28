import { Inject, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { accounts, wallets } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class WalletsService {
  constructor(@Inject('DB_CONNECTION') private db: PostgresJsDatabase) {}

  async create(createWalletDto: CreateWalletDto) {
    const [account] = await this.db.select().from(accounts).where(eq(accounts.userId, createWalletDto.userId));
    const newWallet = await this.db.insert(wallets).values({
      accountId: account.id,
      name: createWalletDto.name,
      address: createWalletDto.address,
      isOld: createWalletDto.isOld,
    });
    return newWallet[0];
  }

  async findAll(userId: number) {
    const [account] = await this.db.select().from(accounts).where(eq(accounts.userId, userId));
    return this.db.select().from(wallets).where(eq(wallets.accountId, account.id));
  }

  async findOne(id: number) {
    const [wallet] = await this.db.select().from(wallets).where(eq(wallets.id, id));
    return wallet;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
