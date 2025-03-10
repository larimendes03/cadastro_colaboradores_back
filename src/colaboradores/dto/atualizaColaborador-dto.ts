import { IsEmail, IsOptional, Length} from "class-validator";
import { isUniqueEmail, isUniqueCpf, isNoSpace } from "../decoratorsPersonalizados/decorators-validators";
import { dependentesEntity } from "src/dependentes/dependentes-entity";

export class AtualizaColaboradorDTO {
    
    @IsOptional()
    id: string;

    @IsOptional()
    @isNoSpace({message: 'O nome não pode conter espaços em branco' })
    nome: string;

    @IsOptional()
    usuario: string;

    @IsOptional()
    @IsEmail(undefined, {message: 'Deve-se informar um e-mail válido'} )
    // @isUniqueEmail({message: 'E-mail já registrado no banco de dados'})
    email: string;

    @IsOptional()
    @Length(11,11, {message: "O cpf deve possuir 11 digítos"})
    // @isUniqueCpf({message: 'CPF informado já existe no banco de dados'})
    cpf: string;

    @IsOptional()
    dt_nascimento: Date;

    @IsOptional()
    dt_admissao: Date;

    @IsOptional()
    dt_afastamento: Date;

    @IsOptional()
    ds_motivo_afast: string;   

    @IsOptional()
    dependentes: dependentesEntity[]
}
