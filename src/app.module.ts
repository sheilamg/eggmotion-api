import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmotionsModule } from './emotions/emotions.module';
import { typeConfig } from './config/typeConfig';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JournalModule } from './journal/journal.module';
import { JournalTagsModule } from './journal_tags/journal_tags.module';
import { JournalReflectionsModule } from './journal_reflections/journal_reflections.module';
import { JournalMediaModule } from './journal_media/journal_media.module';
import { EmotionsByUserModule } from './emotions-by-user/emotions_by_user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeConfig()), EmotionsModule, EmotionsByUserModule,AuthModule, UsersModule, JournalModule, JournalTagsModule, JournalReflectionsModule, JournalMediaModule],
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
})
export class AppModule {}
