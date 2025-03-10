import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { dependentesService } from "../dependentes-service";

@Injectable()
@ValidatorConstraint({ async: true }) // para informar ao class-validator que é uma validação assincrona
export class isUniqueCpfDpendenteValidator implements ValidatorConstraintInterface {

    constructor(private dependenteService : dependentesService) {}

    async validate(value: any,  validationArguments?: ValidationArguments): Promise<boolean>  {
        const cpfUnico = await this.dependenteService.isUniqueCPF(value);
        return !cpfUnico;
    }
}

export const isUniqueCpfDependente = (opcoesdeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({ // registrar o decorator com algumas configurações bases
            target: objeto.constructor, // passando o construtor do objeto
            propertyName: propriedade,
            options: opcoesdeValidacao,
            constraints: [],
            validator: isUniqueCpfDpendenteValidator
        }); 
    }
}
