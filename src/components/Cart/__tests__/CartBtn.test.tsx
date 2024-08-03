import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '../../../routes/store/useProductsQuery';
import StyledProvider from '../../../StyledProvider';
import useProductStore from '../../../zustand-store/useProductStore';
import CartBtn from '../CartBtn';

const originalState = useProductStore.getState();

const fakeProduct: Product = {
  image: 'https://random.com/',
  title: 'Apple',
  price: 5,
  id: 10,
  description: 'testing',
};

beforeEach(() => {
  useProductStore.setState(originalState);
});

describe('Cart Button', () => {
  it('opens modal on click', async () => {
    const user = userEvent.setup();
    renderCartBtn();

    const cartBtn = screen.getByRole('button', {
      name: 'Clique para ver o carrinho',
    });

    await user.click(cartBtn);

    const modal = screen.getByRole('dialog');
    const title = within(modal).getByRole('heading', { level: 2 });

    expect(modal).toBeInTheDocument();
    expect(title.textContent).toBe('Carrinho');
  });
  it('does not show amount of products if cart is empty', async () => {
    renderCartBtn();

    const label = screen.queryByLabelText('Número de itens no carrinho');

    expect(label).not.toBeInTheDocument();
  });
  it('does show amount of products if cart is not empty', async () => {
    fakeAddToCart();
    renderCartBtn();

    const label = screen.getByLabelText('Número de itens no carrinho');

    expect(label.textContent).toBe('1');
  });
});

const renderCartBtn = () => {
  return render(
    <MemoryRouter>
      <StyledProvider>
        <CartBtn />
      </StyledProvider>
    </MemoryRouter>
  );
};

const fakeAddToCart = () => {
  const addFn = useProductStore.getState().addToCart(fakeProduct);

  addFn();
};
