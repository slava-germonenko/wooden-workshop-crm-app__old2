import { FormFieldType } from '@framework/form/form-field-type';
import { FormFieldValidator } from '@framework/form/form-field-validator';

export interface FormField {
  type: FormFieldType;
  id: string;
  label: string;
  placeholder?: string;
  validators?: FormFieldValidator[];
}
