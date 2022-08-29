import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const DEFAULT_ALLOWED_TAGS = [
  '<div>',
  '<strong>',
  '<em>',
  '<p>',
  '<a>',
  '<del>',
  '<br>',
  '<pre>',
  '<blockquote>',
  '<ul>',
  '<ol>',
  '<li>',
  '<h1>',
  '<h2>',
  '<h3>',
  '<h4>',
  '<h5>',
  '<h6>',
];

/**
 * Checks if value is equals with one of the valid values.
 * @param allowedTags The allowed HTML tags. For example: `['<div>', '<strong>', '<em>']`.
 * @param validationOptions The validation options.
 */
export function IsValidHtml(
  allowedTags: string[] = DEFAULT_ALLOWED_TAGS,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [allowedTags],
      options: Object.assign(
        {
          message:
            '$property can only contains the following HTML tags: $constraint1',
        },
        validationOptions,
      ),
      validator: IsValidHtmlConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'equalsAny' })
export class IsValidHtmlConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const [allowedTags] = args.constraints as [string[], any];
    const htmlOpeningTagRegex = /<[\w\d]+>/gi;

    if (typeof value !== 'string') {
      return false;
    }

    const tags = value.match(htmlOpeningTagRegex) ?? [];
    return tags.every((tag) => allowedTags.includes(tag));
  }
}
