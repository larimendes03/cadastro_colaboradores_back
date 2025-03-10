import { IsEmail, IsNotEmpty, IsOptional, Length} from "class-validator";
import { isNoSpace, isUniqueCpf, isUniqueEmail } from "../decoratorsPersonalizados/decorators-validators";
import { dependentesEntity } from "src/dependentes/dependentes-entity";

export class CriaColaboradorDTO {

    id: string;

    @IsNotEmpty({message: ' Deve-se informar um nome' })
    @isNoSpace({message: ' O nome não pode conter espaços em branco' })
    nome: string;

    @IsEmail(undefined, {message: 'Deve-se informar um e-mail válido e sem espaços em branco'} )
    @isUniqueEmail({message: ' E-mail já registrado no banco de dados'})
    email: string;

    @IsNotEmpty({message: ' Deve-se informar um usuário' })
    usuario: string;

    @Length(11,11, {message: "O cpf deve possuir 11 digítos"})
    @isUniqueCpf({message: ' CPF informado já existe no banco de dados'})
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
