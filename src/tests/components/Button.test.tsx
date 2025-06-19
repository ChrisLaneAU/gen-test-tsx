import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Button } from './Button';

describe('Given a Button is rendered', () => {
  describe('When it is rendered as a link with an href and children', () => {
    test('Then it should be visible as a link with the correct accessible name', () => {
      render(<Button href="https://example.com">Go to Example</Button>);

      expect(screen.getByRole('link', { name: 'Go to Example' })).toBeVisible();
    });

    test('Then it should have the correct href attribute', () => {
      render(<Button href="https://example.com">Go to Example</Button>);

      expect(
        screen.getByRole('link', { name: 'Go to Example' })
      ).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('When it is rendered as a button with an onClick handler and children', () => {
    test('Then it should be visible as a button with the correct accessible name', () => {
      render(<Button onClick={() => {}}>Submit</Button>);

      expect(screen.getByRole('button', { name: 'Submit' })).toBeVisible();
    });

    test('Then it should call the onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Submit</Button>);

      await user.click(screen.getByRole('button', { name: 'Submit' }));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('When it is rendered as a controlled button with value and onChange', () => {
    function ControlledButton() {
      const [value, setValue] = useState('Initial');
      return <Button onClick={() => setValue('Clicked')}>{value}</Button>;
    }

    test('Then it should update the value when clicked', async () => {
      const user = userEvent.setup();
      render(<ControlledButton />);

      await user.click(screen.getByRole('button', { name: 'Initial' }));

      expect(screen.getByRole('button', { name: 'Clicked' })).toBeVisible();
    });
  });
});
