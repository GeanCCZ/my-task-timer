import { AccountRepository, Account } from "@my-task-timer/account-users-domain";
import { randomUUID } from 'crypto';

export class AccountRepositoryMock implements AccountRepository {
  private accounts: Account[] = [];

  async createOne(input: Account): Promise<Account> {
    const newAccount: Account = { 
      ...input, 
      id: randomUUID()
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  async findOne(id: string): Promise<Account> {
    const account = this.accounts.find(account => account.id === id);
    if (!account) {
      throw new Error(`Account with id ${id} not found`);
    }
    return account;
  }

  async updateOne(id: string, input: Account): Promise<Account> {
    const index = this.accounts.findIndex(account => account.id === id);
    if (index === -1) {
      throw new Error(`Account with id ${id} not found`);
    }
    const updatedAccount: Account = { 
      ...this.accounts[index], 
      ...input 
    };
    this.accounts[index] = updatedAccount;
    return updatedAccount;
  }

  async findByEmailOrUsername(email?: string, username?: string): Promise<Account> {
    const account = this.accounts.find(account =>
      (email && account.email === email) ||
      (username && account.username === username)
    );
    if (!account) {
      throw new Error(`Account not found for provided email or username`);
    }
    return account;
  }

  async deleteOne(id: string): Promise<string> {
    const index = this.accounts.findIndex(account => account.id === id);
    if (index === -1) {
      throw new Error(`Account with id ${id} not found`);
    }
    // Remove o usuário do array
    this.accounts.splice(index, 1);
    return 'User removed successfully';
  }

  
  resetMock(): void {
    this.accounts = [];
  }

  populateMock(accounts: Account[]): void {
    this.accounts = accounts;
  }
}
