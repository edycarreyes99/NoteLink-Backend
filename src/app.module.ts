import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './modules/notes/notes.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [NotesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
