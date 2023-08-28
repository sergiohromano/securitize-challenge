import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { accounts, users } from 'src/drizzle/schema';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@Inject('DB_CONNECTION') private db: PostgresJsDatabase) {}

  async findOne(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.email, username));
    return user;
  }

  async createOne(username: string, password: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.email, username));
    if (user) {
      return undefined;
    }
    const _newUser = await this.db.insert(users).values({ email: username, password, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()});
    const [newUserAccount] = await this.db.select().from(users).where(eq(users.email, username));

    return newUserAccount;
  }

  async createAccount(userId: number): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, userId));
    if (!user) {
      return undefined;
    }
    const newAccount = await this.db.insert(accounts).values({ userId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()});

    return newAccount;
  }
}

