import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { validateCpfCnpj } from './validateCpfCnpj';

export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    if (!validationOptions) {
      validationOptions = {
        message: `${propertyName} must be a valid CPF or CNPJ`,
      };
    }
    registerDecorator({
      name: 'isCpfCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validateCpfCnpj(value);
        },
      },
    });
  };
}
