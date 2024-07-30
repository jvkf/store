import { ShoppingCart } from 'lucide-react';
import styled from 'styled-components';

export const ControlBtn = styled.button`
  border: 2px solid ${(props) => props.theme.colors.black};
  appearance: none;
  background: none;
  display: inline-block;
  width: 32px;
  height: 32px;
  aspect-ratio: 1;
  border-radius: 100%;
  cursor: pointer;
  font-weight: 700;
  transition: all 150ms ease-in;
  flex-shrink: 0;

  &:hover {
    border-color: ${(props) => props.theme.colors.complementary};
    background-color: ${(props) => props.theme.colors.complementary};
    color: ${(props) => props.theme.colors.light};
  }
`;

interface AddBtnProps {
  onClick: () => void;
}

export default function AddCartButton({ onClick }: AddBtnProps) {
  return (
    <ControlBtn onClick={onClick}>
      <span className="sr-only">Adicionar</span>
      <ShoppingCart strokeWidth={2.5} />
    </ControlBtn>
  );
}
