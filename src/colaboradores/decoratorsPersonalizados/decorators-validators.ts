import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import { Injectable } from "@nestjs/common";
import { ColaboradorService } from "../colaborador-service";

@Injectable()
@ValidatorConstraint({ async: true }) // para informar ao class-validator que é uma validação assincrona
export class isUniqueEmailValidator implements ValidatorConstraintInterface {

    constructor(private colaboradorService : ColaboradorService) {}

    async validate(value: any,  validationArguments?: ValidationArguments): Promise<boolean>  {
        const emailUnico = await this.colaboradorService.isUniqueEmail(value);
        return !emailUnico;
    }
}

@Injectable()
@ValidatorConstraint({ async: true }) // para informar ao class-validator que é uma validação assincrona
export class isUniqueCpfValidator implements ValidatorConstraintInterface {

    constructor(private colaboradorService : ColaboradorService) {}

    async validate(value: any,  validationArguments?: ValidationArguments): Promise<boolean>  {
        const cpfUnico = await this.colaboradorService.isUniqueCPF(value);
        return !cpfUnico;
    }
}

export const isUniqueEmail = (opcoesdeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({ // registrar o decorator com algumas configurações bases
            target: objeto.constructor, // passando o construtor do objeto
            propertyName: propriedade,
            options: opcoesdeValidacao,
            constraints: [],
            validator: isUniqueEmailValidator
        }); 
    }
}

export const isUniqueCpf = (opcoesdeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({ // registrar o decorator com algumas configurações bases
            target: objeto.constructor, // passando o construtor do objeto
            propertyName: propriedade,
            options: opcoesdeValidacao,
            constraints: [],
            validator: isUniqueCpfValidator
        }); 
    }
}

@Injectable()
@ValidatorConstraint({ async: true }) // para informar ao class-validator que é uma validação assincrona
export class isNoSpaceValidator implements ValidatorConstraintInterface {

    async validate(value: any,  validationArguments?: ValidationArguments): Promise<boolean>  {
        return value === value.trim();
    }
}

export const isNoSpace = (opcoesdeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({ // registrar o decorator com algumas configurações bases
            target: objeto.constructor, // passando o construtor do objeto
            propertyName: propriedade,
            options: opcoesdeValidacao,
            constraints: [],
            validator: isNoSpaceValidator
        }); 
    }
}