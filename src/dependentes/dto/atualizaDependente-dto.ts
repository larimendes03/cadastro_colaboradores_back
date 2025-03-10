import { IsOptional, Length } from "class-validator";
import { isNoSpace } from "src/colaboradores/decoratorsPersonalizados/decorators-validators";
import { isUniqueCpfDependente } from "../decoratorsPersonalizados/decorators-dependentes";

export class atualizaDependenteDTO{

    id: string;

    @IsOptional()
    @isNoSpace({message: "O nome não pode conter espaços em branco"})
    nome: string;

    @IsOptional()
    @isUniqueCpfDependente({message: "CPF já registrado no banco de dados"})
    @Length(11,11, {message: "O cpf deve possuir 11 digítos"})
    cpf: string;

    @IsOptional()
    data_nascimento: Date;

    @IsOptional()
    parentesco: string;

    @IsOptional()
    id_colaborador: string;

}