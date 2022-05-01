import { FormField } from '@framework/form';

export const PASSWORD_FORM_FIELDS: FormField[] = [
  {
    type: 'password',
    id: 'oldPassword',
    label: 'Старый пароль',
  },
  {
    type: 'password',
    id: 'newPassword',
    label: 'Новый пароль',
  },
  {
    type: 'password',
    id: 'confirmPassword',
    label: 'Подтвердите пароль',
  },
]
