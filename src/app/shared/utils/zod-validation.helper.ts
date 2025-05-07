import { ZodSchema } from 'zod';
import { AbstractControl } from '@angular/forms';

export function setupZodValidation<T extends Record<string, AbstractControl>>(
  controls: T,
  schema: ZodSchema,
) {
  Object.entries(controls).forEach(([key, control]) => {
    control.valueChanges.subscribe(() => {
      const rawValue: any = Object.fromEntries(
        Object.entries(controls).map(([k, c]) => [k, c.value]),
      );

      const result = schema.safeParse(rawValue);

      if (!result.success) {
        const message = result.error.flatten().fieldErrors[key]?.[0];
        if (message) {
          control.setErrors({ zod: message });
        } else {
          control.setErrors(null);
        }
      } else {
        control.setErrors(null);
      }
    });
  });
}
