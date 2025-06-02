import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [PrismaModule, ResponseModule],
})
export class ProvidersModule {}
