import { Module } from '@nestjs/common';
import { dependentesController } from './dependentes-controller';
import { dependentesEntity } from './dependentes-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dependentesService } from './dependentes-service';
import { isNoSpaceValidator } from 'src/colaboradores/decoratorsPersonalizados/decorators-validators';
import { isUniqueCpfDpendenteValidator } from './decoratorsPersonalizados/decorators-dependentes';

@Module({
    imports: [TypeOrmModule.forFeature([dependentesEntity])],
    controllers: [dependentesController],
    providers: [dependentesService, isNoSpaceValidator, isUniqueCpfDpendenteValidator],
})

export class dependentesModule {}