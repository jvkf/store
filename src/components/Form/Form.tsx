import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import type { ProductWithAmount } from '../../zustand-store/useProductStore';
import Input from './Input';
import { formSchema, FormSchema } from './Schema';

const StyledForm = styled.form`
  padding: ${(props) => props.theme.spacing.xlarge};
  margin-top: auto;
  background-color: ${(props) => props.theme.colors.light};
  border-top: 1px solid black;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr) 10ch repeat(3, 1fr);
  margin-bottom: 1rem;
  gap: 1rem 2rem;
  width: 100%;

  @media screen and (max-width: 900px) {
    & {
      grid-template-columns: 10ch repeat(3, 1fr);
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  grid-column: span 4;

  & > input[aria-invalid='true'] {
    border-color: red;
  }
  & > input[aria-invalid='false'].touched {
    border-color: green;
  }

  &.cvv-container {
    grid-column: span 1;
  }
  &.date-container {
    grid-column: span 3;
  }
`;

const SubmitBtn = styled.button`
  margin: 0 auto;
  width: fit-content;
  display: block;
  appearance: none;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.theme.colors.main};
  padding: ${(props) => props.theme.spacing.small};
  border: 1px solid ${(props) => props.theme.colors.main};
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.secondary};
  }
`;

interface FormProps {
  cart: ProductWithAmount[];
}

export default function Form({ cart }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  });

  function handlePaymentForm(data: FormSchema) {
    console.log(data, cart);
  }

  return (
    <StyledForm onSubmit={handleSubmit(handlePaymentForm)}>
      <FormContainer>
        <InputContainer>
          <Input
            touched={touchedFields.fullName || false}
            registerProps={register('fullName')}
            name="fullName"
            label="Nome completo"
            errors={errors}
            htmlProps={{ placeholder: 'João da Silva' }}
          />
        </InputContainer>
        <InputContainer>
          <Input
            touched={touchedFields.ccNumber || false}
            registerProps={register('ccNumber')}
            name="ccNumber"
            label="Número do cartão"
            errors={errors}
            htmlProps={{ maxLength: 16, placeholder: '5500123443215678' }}
          />
        </InputContainer>
        <InputContainer className="cvv-container">
          <Input
            touched={touchedFields.ccSecurity || false}
            registerProps={register('ccSecurity')}
            name="ccSecurity"
            label="CVV"
            errors={errors}
            htmlProps={{ maxLength: 3, placeholder: '123' }}
          />
        </InputContainer>
        <InputContainer className="date-container">
          <Input
            touched={touchedFields.ccDate || false}
            registerProps={register('ccDate')}
            name="ccDate"
            label="Data de vencimento"
            errors={errors}
            htmlProps={{
              type: 'month',
              defaultValue:
                new Date().getUTCFullYear().toString() +
                '-' +
                new Date().getMonth().toString().padStart(2, '0'),
            }}
          />
        </InputContainer>
      </FormContainer>
      <SubmitBtn type="submit">Comprar</SubmitBtn>
    </StyledForm>
  );
}
