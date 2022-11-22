import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './modules/notes/notes.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import notelinkOrmconfig from './notelink-ormconfig';

@Module({
  imports: [
    NotesModule,
    AuthModule,
    TypeOrmModule.forRoot(notelinkOrmconfig.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
