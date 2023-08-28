import { boolean, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  name: varchar('name', { length: 255 }),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  accountId: serial('account_id').references(() => accounts.id),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }),
  isOld: boolean('is_old').default(false),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export const currency = pgTable('currencies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  symbol: varchar('symbol', { length: 255 }),
  price: numeric('price'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});
