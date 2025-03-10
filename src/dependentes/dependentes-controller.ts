import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { criaDependenteDTO } from "./dto/criaDependente-dto";
import { v4 as uuid } from 'uuid';
import { atualizaDependenteDTO } from "./dto/atualizaDependente-dto";
import { dependentesService } from "./dependentes-service";


@Controller('/dependentes')
export class dependentesController{

    constructor(private readonly dependentesService: dependentesService){}

    @Post()
    async criaDependente(@Body() dtoDependentes: criaDependenteDTO){
        dtoDependentes.id = uuid();
        await this.dependentesService.salvarDados(dtoDependentes);
        return dtoDependentes;
    }

    @Get(':idColaborador')
    async listaDependentes(@Param('idColaborador') idColaborador: string){
      return await this.dependentesService.listarDependentes(idColaborador);
    }

    @Put(':id')
    async atualizaById(@Param('id') id:string, @Body() dtoDependentes: atualizaDependenteDTO){
      return this.dependentesService.atualizaDependente(id, dtoDependentes);
    }
    
    @Delete(':id')
    async deleteDependenteById(@Param('id') id:string){
       return this.dependentesService.deletarColaboradorById(id);
    }
}