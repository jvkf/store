import { forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';
import styled from 'styled-components';
import { FormKeySchema, FormSchema } from './Schema';

const StyledInput = styled.input`
  appearance: none;
  border: 1px solid black;
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing.xsmall};
  font-size: ${(props) => props.theme.fontSizes.small};
`;

const ErrorMessage = styled.span`
  min-height: 25px;
  color: red;
`;

export type InputProps = {
  registerProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  name: FormKeySchema;
  label: string;
  errors: FieldErrors<FormSchema>;
  touched: boolean;
  htmlProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ registerProps, name, label, errors, touched, htmlProps }, ref) => (
    <>
      <label htmlFor={name}>{label}</label>
      <StyledInput
        id={name}
        aria-invalid={errors[name] ? 'true' : 'false'}
        className={touched ? 'touched' : ''}
        ref={ref}
        {...registerProps}
        {...htmlProps}
      />
      <ErrorMessage>{errors[name] && errors[name].message}</ErrorMessage>
    </>
  )
);

export default Input;
