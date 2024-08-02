import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { FinishedData } from '../../routes/checkout/Checkout';
import type { ProductStoreState } from '../../zustand-store/useProductStore';
import useProductStore from '../../zustand-store/useProductStore';
import {
  FormContainer,
  InputContainer,
  StyledForm,
  SubmitBtn,
} from './FormStyledComponents';
import Input from './Input';
import { formSchema, FormSchema } from './Schema';
export interface FormProps extends ProductStoreState {
  setFinishedData: React.Dispatch<React.SetStateAction<FinishedData | null>>;
}

export default function Form({ cart, setFinishedData }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  });

  const resetCart = useProductStore.getState().reset;

  function handlePaymentForm(formData: FormSchema) {
    setFinishedData({ formData, cart });
    console.log(formData);
    console.log(cart);
    resetCart();
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
                (new Date().getMonth() + 1).toString().padStart(2, '0'),
            }}
          />
        </InputContainer>
      </FormContainer>
      <SubmitBtn type="submit">Comprar</SubmitBtn>
    </StyledForm>
  );
}
