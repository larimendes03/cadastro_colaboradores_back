import { Injectable } from "@nestjs/common";
import { colaboradoresEntity } from "./colaboradores-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ColaboradorService {

    constructor(
        @InjectRepository(colaboradoresEntity)
        private readonly repository: Repository<colaboradoresEntity>,
    ) {}

    dadosColaborador: colaboradoresEntity[] = [];

    saveDatas(dadosColaborador: colaboradoresEntity){
        this.repository.save(dadosColaborador);
        return 'Funcionário cadastrado';
    }

    async listarColaboradores(pagina: number, limite: number){
        const [colaboradores, total] = await this.repository.findAndCount({
            skip: (pagina -1) * limite, // quantidade de registro que ele vai pular
            take: limite, // até qual limite vai ser mostrado
            order:{
                nome: 'ASC' // ordenação registros de forma ascendente com base no nome
            }
        });

        return {
            total,
            pagina,
            limite,
            dados: colaboradores
        };
    }

    listarColaboradoresById(id: string){
        return this.listaColaboradorById(id);
    }

    async contarColaborador(){
        const totalColaboradores = await this.repository.count();
        return totalColaboradores;        
    }

    async deleteColaboradorById(id: string){
        const temColaborador = await this.listaColaboradorById(id);

        if (!temColaborador){
            return ' Este funcionário não existe'
        }

        this.repository.delete(id);
        return ' Funcionário deletado'
            
    }

    async updateById(id: string, dadosColaborador: colaboradoresEntity){
       let colaborador = await this.listaColaboradorById(id);
        
        if (!colaborador){
            return ' Este funcionário não existe'
        } 
        
        colaborador = {...dadosColaborador};
        this.repository.update(id,colaborador);
        return ' Funcionário atualizado com sucesso'
        

    }

    async isUniqueEmail(email: string){
        const emailExiste = await this.repository.findOne({
        where: {
            email: email
        }});

        return emailExiste;       

    }

    async isUniqueCPF(cpf: string){
        const cpfExiste = await this.repository.findOne({
            where: {
                cpf: cpf
            }});
    
        return cpfExiste;
    }
 
    async listaColaboradorById(id: string) {
        return await this.repository.findOne({
            where: {
                id: id
            }
        });
    }
}
