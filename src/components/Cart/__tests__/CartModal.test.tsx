import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Product } from '../../../routes/store/useProductsQuery';
import StyledProvider from '../../../StyledProvider';
import useProductStore from '../../../zustand-store/useProductStore';
import CartModal from '../CartModal';
import { CartProductProps } from '../CartProduct';

const handleDeleteMock = vi.fn();

vi.mock('../CartProduct.tsx', () => ({
  default: ({ product }: CartProductProps) => {
    return (
      <div data-testid="mock-product">
        <h1>{product.title}</h1>
        <h2>{product.price}</h2>
        <h3>{product.amount}</h3>
        <button data-testid="mock-btn" onClick={handleDeleteMock} />
      </div>
    );
  },
}));

let isOpen = true;
const setIsOpen = vi.fn(() => (isOpen = !isOpen));
const originalState = useProductStore.getState();

const products: Product[] = [
  {
    image: 'https://random.com/',
    title: 'Apple',
    price: 5,
    id: 10,
    description: 'testing',
  },
  {
    image: 'https://random.com/',
    title: 'Orange',
    price: 5,
    id: 15,
    description: 'testing',
  },
  {
    image: 'https://random.com/',
    title: 'Grape',
    price: 5,
    id: 20,
    description: 'testing',
  },
];

beforeEach(() => {
  useProductStore.setState(originalState);
  isOpen = true;
});

describe('Modal', () => {
  it('closes on close click', async () => {
    const user = userEvent.setup();
    renderModal();

    const closeBtn = screen.getByRole('button', {
      name: 'Fechar',
    });

    await user.click(closeBtn);

    expect(isOpen).toBe(false);
  });

  it('shows the right amount of products', async () => {
    fakeAdd3ToCart();
    renderModal();

    const dialog = screen.getByRole('dialog');
    const products = within(dialog).getAllByTestId('mock-product');

    expect(products.length).toBe(3);
  });
  it('shows the right information of products', async () => {
    fakeAdd3ToCart();
    renderModal();

    const dialog = screen.getByRole('dialog');
    const groupOfProducts = within(dialog).getAllByTestId('mock-product');

    expect(groupOfProducts.length).toBe(3);
    expect(
      within(groupOfProducts[0]).getByRole('heading', { level: 1 }).textContent
    ).toBe(products[0].title);
    expect(
      within(groupOfProducts[1]).getByRole('heading', { level: 1 }).textContent
    ).toBe(products[1].title);
    expect(
      within(groupOfProducts[2]).getByRole('heading', { level: 1 }).textContent
    ).toBe(products[2].title);
  });
  it('does not show anything if there is no product on cart', async () => {
    renderModal();

    const dialog = screen.getByRole('dialog');
    const products = within(dialog).queryAllByTestId('mock-product');

    expect(products.length).toBe(0);
  });
  it('does delete item', async () => {
    const user = userEvent.setup();
    fakeAdd3ToCart();
    renderModal();
    const dialog = screen.getByRole('dialog');
    const product = within(dialog).queryAllByTestId('mock-product')[0];
    const button = within(product).queryByTestId(
      'mock-btn'
    ) as HTMLButtonElement;

    await user.click(button);

    expect(handleDeleteMock).toBeCalled();
  });
});

const renderModal = () => {
  return render(
    <StyledProvider>
      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledProvider>
  );
};

const fakeAdd3ToCart = () => {
  products.forEach((product) => {
    useProductStore.getState().addToCart(product)();
  });
};
