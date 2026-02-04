import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Checks if value is a valid Nanoid (URL-safe ID).
 * @param length The expected Nanoid length.
 * @param validationOptions The validation options.
 */
export function IsNanoid(
  lengthOrOptions: number | ValidationOptions = 21,
  validationOptions?: ValidationOptions,
) {
  const length = typeof lengthOrOptions === 'number' ? lengthOrOptions : 21;
  const options =
    typeof lengthOrOptions === 'number' ? validationOptions : lengthOrOptions;

  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [length],
      options: Object.assign(
        {
          message: '$property must be a valid Nanoid',
        },
        options,
      ),
      validator: IsNanoidConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isNanoid' })
export class IsNanoidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [length] = (args.constraints ?? []) as [number?];
    const nanoidRegex = new RegExp(`^[A-Za-z0-9_-]{${length ?? 21}}$`);
    return typeof value === 'string' && nanoidRegex.test(value);
  }
}
