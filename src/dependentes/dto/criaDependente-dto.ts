import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { isNoSpace } from "src/colaboradores/decoratorsPersonalizados/decorators-validators";
import { isUniqueCpfDependente} from "../decoratorsPersonalizados/decorators-dependentes";

export class criaDependenteDTO{

    id: string;

    @IsNotEmpty({message: "O nome não pode estar nulo"})
    @isNoSpace({message: "O nome não pode conter espaços em branco"})
    nome: string;
    
    @IsNotEmpty({message: "O CPF não pode estar nulo"})
    @isUniqueCpfDependente({message: "CPF já registrado no banco de dados"})
    @Length(11,11, {message: "O CPF deve possuir 11 digítos"})
    cpf: string;

    @IsOptional()
    data_nascimento: Date;

    @IsOptional()
    parentesco: string;

    @IsOptional()
    id_colaborador: string;

}