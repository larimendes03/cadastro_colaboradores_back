import { Module } from "@nestjs/common";
import { ColaboradorController } from "./colaboradores-controller";
import { ColaboradorService } from "./colaborador-service";
import { isNoSpaceValidator, isUniqueCpfValidator, isUniqueEmailValidator } from "./decoratorsPersonalizados/decorators-validators";
import { TypeOrmModule } from "@nestjs/typeorm";
import { colaboradoresEntity } from "./colaboradores-entity";
import { dependentesService } from "src/dependentes/dependentes-service";
import { dependentesEntity } from "src/dependentes/dependentes-entity";

@Module({
    imports: [TypeOrmModule.forFeature([colaboradoresEntity, dependentesEntity])],
    controllers : [ColaboradorController],
    providers: [ColaboradorService, dependentesService, isUniqueEmailValidator, isUniqueCpfValidator, isNoSpaceValidator] // criação de instancias
})

export class ColaboradorModule{}