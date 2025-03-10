import { Body, Controller, Delete, Get, Param, Post, Put, Query, BadRequestException } from "@nestjs/common";
import { ColaboradorService} from "./colaborador-service";
import { CriaColaboradorDTO } from "./dto/criaColaborador-dto";
import { AtualizaColaboradorDTO } from "./dto/atualizaColaborador-dto";
import { v4 as uuid } from 'uuid';
import { dependentesService } from "src/dependentes/dependentes-service";

@Controller('/colaboradores')
export class ColaboradorController{

    constructor(private readonly colaboradorService : ColaboradorService,
                private readonly dependentesService: dependentesService
    ) {}    
    
    @Post() // usado para criar dados
    async createColaborador(@Body() dadosColaborador: CriaColaboradorDTO) { // dados do colaborador é do tipo dto (criaColaboraddores)
        dadosColaborador.id = uuid();
        this.colaboradorService.saveDatas(dadosColaborador);
        return {message: "Colaborador cadastrado com sucesso"};
    }

    @Get() // usado para recuperar dados
    async listarColaboradores(@Query('pagina') pagina: number, @Query('limite') limite: number) {
        return await this.colaboradorService.listarColaboradores(pagina, limite);
    }

    @Get('sumario') // recuperar quantidade de colaboradores e dependentes
    async getTotalPessoas() {
        const totalColaboradores = await this.colaboradorService.contarColaborador();
        const totalDependentes = await this.dependentesService.contarDependentes();
        return {totalColaboradores, totalDependentes};
    }
    
    @Get(':id') // recuperar dados por um id
    async listarColaboradoresById(@Param('id') id: string) {
       return this.colaboradorService.listarColaboradoresById(id);
    }

    @Put(':id')
    async updateById(@Param('id') id:string, @Body() dadosColaborador: AtualizaColaboradorDTO){
        return await this.colaboradorService.updateById(id, dadosColaborador);
    }
    

    @Delete(':id')
    async deleteColaboradorById(@Param('id') id:string){
        if (await this.dependentesService.existeDependente(id)){
            throw new BadRequestException("Existe dependente ligado ao colaborador")
        }

        return this.colaboradorService.deleteColaboradorById(id);
    }
       
}