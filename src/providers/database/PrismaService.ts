import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable({ durable: false, scope: Scope.DEFAULT })
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
