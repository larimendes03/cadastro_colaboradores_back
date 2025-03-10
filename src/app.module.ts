import { Module } from '@nestjs/common';
import { ColaboradorModule } from './colaboradores/colaboradores-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dependentesModule } from './dependentes/dependentes-module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'kbase.servebeer.com',
    port: 7090,
    username: 'talentosUser',
    password: 'talentosPass',
    database: 'talentosDB',
    entities: [],
    synchronize: false,
    autoLoadEntities: true
  }),
  ColaboradorModule,
  dependentesModule]
})

export class AppModule {}
