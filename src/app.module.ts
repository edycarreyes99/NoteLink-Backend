import { Module } from '@nestjs/common';
import { NotesModule } from './modules/notes/notes.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import notelinkOrmconfig from './notelink-ormconfig';
import { FirebaseAuthStrategy } from './modules/auth/strategies/firebase-auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    NotesModule,
    AuthModule,
    TypeOrmModule.forRoot(notelinkOrmconfig.options),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  exports: [PassportModule],
  controllers: [],
  providers: [FirebaseAuthStrategy],
})
export class AppModule {}
