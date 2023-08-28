import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import fetch from 'node-fetch';

const API_KEY = process.env.ETHERSCAN_API_KEY || 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: any,@Body() createWalletDto: CreateWalletDto) {
    createWalletDto.userId = req.user.user.id;
    createWalletDto.isOld = false;
    const res = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${createWalletDto.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`);
    const data = await res.json();
    const transaction = data.result[0];
    if (transaction) {
      const timestamp = transaction.timeStamp;
      // compare if timeStamp is older than one yoear
      const date = new Date(timestamp * 1000);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const diffDays = diff / (1000 * 3600 * 24);
      if (diffDays > 365) {
        createWalletDto.isOld = true;
      }
    }
    return this.walletsService.create(createWalletDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.walletsService.findAll(req.user.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/balance')
  async getBalance(@Param('id') id: string) {
    const wallet = await this.walletsService.findOne(+id);
    const res = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${wallet.address}&tag=latest&apikey=${API_KEY}`);
    const data = await res.json();
    return data.result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}
