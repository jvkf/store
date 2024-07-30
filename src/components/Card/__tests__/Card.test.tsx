import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '../../../routes/store/useProductsQuery';
import StyledProvider from '../../../StyledProvider';
import useProductStore from '../../../zustand-store/useProductStore';
import Card, { formatCurrency } from '../Card';

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

describe('card component', () => {
  it('shows the correct information', () => {
    renderCard();

    const image = screen.getByRole('img') as HTMLImageElement;
    const title = screen.getByRole('heading', {
      level: 2,
    }) as HTMLHeadingElement;
    const price = screen.getByRole('heading', {
      level: 3,
    }) as HTMLHeadingElement;

    expect(image.src).toBe(fakeProduct.image);
    expect(title.textContent).toBe(fakeProduct.title);
    expect(price.textContent).toBe(formatCurrency(fakeProduct.price));
  });
  it('shows add btn on initial render', async () => {
    renderCard();

    const addBtn = screen.getByRole('button');

    expect(addBtn.textContent).toBe('Adicionar');
  });
  it('shows input buttons + amount: 1 after adding to cart click', async () => {
    const user = userEvent.setup();
    renderCard();

    const addBtn = screen.getByRole('button', { name: 'Adicionar' });

    await act(async () => {
      await user.click(addBtn);
    });

    const inputButtons = screen.getAllByRole('button');

    expect(addBtn).not.toBeInTheDocument();
    expect(inputButtons.length).toBe(2);
    expect(inputButtons.some((el) => el.textContent === '-')).toBe(true);
    expect(inputButtons.some((el) => el.textContent === '+')).toBe(true);
    expect(screen.getByLabelText('Quantidade').textContent).toBe('1');
  });
  it('increases amount after adding click', async () => {
    const user = userEvent.setup();
    renderCard();

    const addBtn = screen.getByRole('button', { name: 'Adicionar' });

    await act(async () => {
      await user.click(addBtn);
    });

    const increaseBtn = screen.getByRole('button', { name: '+' });

    expect(screen.getByLabelText('Quantidade').textContent).toBe('1');

    await act(async () => {
      await user.click(increaseBtn);
    });

    expect(screen.getByLabelText('Quantidade').textContent).toBe('2');
  });
  it('decreases amount after decrease click', async () => {
    const user = userEvent.setup();
    renderCard();

    const addBtn = screen.getByRole('button', { name: 'Adicionar' });

    await act(async () => {
      await user.click(addBtn);
    });

    const increaseBtn = screen.getByRole('button', { name: '+' });
    const decreaseBtn = screen.getByRole('button', { name: '-' });

    expect(screen.getByLabelText('Quantidade').textContent).toBe('1');

    await act(async () => {
      await user.click(increaseBtn);
      await user.click(increaseBtn);
      await user.click(decreaseBtn);
    });

    expect(screen.getByLabelText('Quantidade').textContent).toBe('2');
  });
  it('restores add to cart btn after decreasing from 1', async () => {
    const user = userEvent.setup();
    renderCard();

    const addBtn = screen.getByRole('button', { name: 'Adicionar' });

    await act(async () => {
      await user.click(addBtn);
    });

    const increaseBtn = screen.getByRole('button', { name: '+' });
    const decreaseBtn = screen.getByRole('button', { name: '-' });
    const amountNode = screen.getByLabelText('Quantidade');

    await act(async () => {
      await user.click(decreaseBtn);
    });

    expect(increaseBtn).not.toBeInTheDocument();
    expect(decreaseBtn).not.toBeInTheDocument();
    expect(amountNode).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Adicionar' })
    ).toBeInTheDocument();
  });
});

const renderCard = () => {
  return render(
    <StyledProvider>
      <Card product={fakeProduct} />
    </StyledProvider>
  );
};
