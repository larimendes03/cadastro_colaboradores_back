import { InjectRepository } from "@nestjs/typeorm";
import { dependentesEntity } from "./dependentes-entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class dependentesService{

    constructor(
        @InjectRepository(dependentesEntity)
        private readonly repository: Repository<dependentesEntity>,
    ) {}

    dtoDependentes: dependentesEntity[] = [];

    async salvarDados(dtoDependentes: dependentesEntity){
        await this.repository.save(dtoDependentes);
        return 'Dependente cadastrado';
    }

    async listarDependentes(idColaborador: string){
        return await this.repository.find({where:{id_colaborador:idColaborador}})
    }

    async contarDependentes(){
        const totalDependentes = await this.repository.count();
        return totalDependentes;
    }

    async atualizaDependente(id: string, dtoDependentes: dependentesEntity){
        let existeDependente = await this.listarColaboradorById(id);
        
        if (!existeDependente){
            return 'Este dependente não existe'
        } 
        
        existeDependente = {...dtoDependentes};
        this.repository.update(id,dtoDependentes);
        return 'Dependente atualizado com sucesso'        
        
    }

    async deletarColaboradorById(id: string){
        const temDependente = await this.listarColaboradorById(id);

        if (!temDependente){
            return 'Este dependente não existe'
        }

        this.repository.delete(id);
        return 'Dependente deletado'
            
    }

    async listarColaboradorById(id: string) {
        return await this.repository.findOne({where:{id:id}})
    }

    async isUniqueCPF(cpf: string){
        const cpfExiste = await this.repository.findOne({
            where: {
                cpf: cpf
            }});
    
        return cpfExiste;

    }

    async existeDependente(id: string){
        const dependenteExiste = await this.repository.findOne({
            where: {
                id_colaborador: id
            }});
        
        return dependenteExiste;
    }

}