import { Minus, Plus } from 'lucide-react';
import styled from 'styled-components';
import { ControlBtn } from './AddCartButton';

const InputBar = styled.div`
  display: flex;
  gap: 5px;
  flex-flow: row nowrap;
  align-items: center;
`;

const AmountText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 500;
  padding: ${(props) => props.theme.spacing.small};
  border: 1px solid black;
`;
interface CartProps {
  amount: number;
  onIncreaseClick: () => void;
  onDecreaseClick: () => void;
}

export default function CartInput({
  amount,
  onIncreaseClick,
  onDecreaseClick,
}: CartProps) {
  return (
    <InputBar>
      <ControlBtn onClick={onDecreaseClick}>
        <Minus strokeWidth={3} />
        <span className="sr-only">-</span>
      </ControlBtn>
      <AmountText aria-label="Quantidade" aria-live="polite">
        {amount}
      </AmountText>
      <ControlBtn onClick={onIncreaseClick}>
        <Plus strokeWidth={3} />
        <span className="sr-only">+</span>
      </ControlBtn>
    </InputBar>
  );
}
