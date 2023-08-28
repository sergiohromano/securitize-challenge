import { Inject, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { accounts, wallets } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
// import node-fetch

@Injectable()
export class WalletsService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  constructor(
    @Inject('DB_CONNECTION') private db: PostgresJsDatabase,
    private readonly configService: ConfigService,
  ) {
    const etherscanApiUrl = this.configService.get<string>('etherscanService.apiUrl');
    const etherscanApiKey = this.configService.get<string>('etherscanService.apiKey');

    if(!etherscanApiUrl || !etherscanApiKey) {
      throw new Error('Missing configuration for etherscanService');
    }

    this.etherscanApiUrl = etherscanApiUrl;
    this.etherscanApiKey = etherscanApiKey;
  }

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

  async getTransactions(address: string){
    const res = await fetch(`${this.etherscanApiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${this.etherscanApiKey}`);
    const data: any = await res.json();
    const transactions = data.result;
    return transactions;
  }

  async getBalance(address: string) {
    const res = await fetch(`${this.etherscanApiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.etherscanApiKey}`);
    const data: any = await res.json();
    return data.result;
  }
}
