import { z } from 'zod';

export const formSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'O nome completo é necessário ' })
    .min(4, { message: 'O nome é muito curto, digite o nome completo' }),
  ccNumber: z
    .string()
    .regex(/^[0-9]*$/, { message: 'Digite somente números' })
    .min(16, { message: 'Digite os 16 dígitos' })
    .transform((val) => parseInt(val)),
  ccSecurity: z
    .string()
    .regex(/^[0-9]*$/, { message: 'Digite somente números' })
    .min(3, { message: 'Digite os 3 dígitos' })
    .transform((val) => parseInt(val)),
  ccDate: z.coerce
    .date({
      message: 'Data inválida',
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError,
      }),
    })
    .min(new Date(new Date().setDate(-1)), {
      message: 'A data de vencimento não pode já ter passado.',
    }),
});

const _formKeys = formSchema.keyof();
export type FormSchema = z.infer<typeof formSchema>;
export type FormKeySchema = z.infer<typeof _formKeys>;
