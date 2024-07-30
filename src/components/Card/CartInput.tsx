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
    <div>
      <button onClick={onIncreaseClick}>+</button>
      <div aria-label="Quantidade">{amount}</div>
      <button onClick={onDecreaseClick}>-</button>
    </div>
  );
}
