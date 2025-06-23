import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { TextInput } from './TextInput';

describe('Given a TextInput is rendered', () => {
  describe('When the label prop is provided', () => {
    test('Then the input should be visible with the accessible name from the label', () => {
      render(<TextInput label="First Name" value="" onChange={() => {}} />);

      expect(screen.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    });
  });

  describe('When the value prop is provided', () => {
    test('Then the input should display the provided value', () => {
      render(
        <TextInput
          label="Email Address"
          value="user@example.com"
          onChange={() => {}}
        />
      );

      expect(
        screen.getByRole('textbox', { name: 'Email Address' })
      ).toHaveValue('user@example.com');
    });
  });

  describe('When the id prop is provided', () => {
    test('Then the input should have the provided id', () => {
      render(
        <TextInput
          label="Username"
          value=""
          onChange={() => {}}
          id="custom-id"
        />
      );

      expect(screen.getByRole('textbox', { name: 'Username' }).id).toBe(
        'custom-id'
      );
    });
  });

  describe('When the id prop is not provided', () => {
    test('Then the input should have the default id', () => {
      render(<TextInput label="Password" value="" onChange={() => {}} />);

      expect(screen.getByRole('textbox', { name: 'Password' }).id).toBe(
        'input-id'
      );
    });
  });

  describe('When the invalid prop is true', () => {
    test('Then the input should have aria-invalid set to true', () => {
      render(<TextInput label="Phone" value="" onChange={() => {}} invalid />);

      expect(screen.getByRole('textbox', { name: 'Phone' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  });

  describe('When the invalid prop is false', () => {
    test('Then the input should have aria-invalid set to false', () => {
      render(
        <TextInput
          label="Address"
          value=""
          onChange={() => {}}
          invalid={false}
        />
      );

      expect(screen.getByRole('textbox', { name: 'Address' })).toHaveAttribute(
        'aria-invalid',
        'false'
      );
    });
  });

  describe('When the onChange prop is called', () => {
    test('Then the onChange handler should be called when the user types', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<TextInput label="City" value="" onChange={handleChange} />);

      await user.type(screen.getByRole('textbox', { name: 'City' }), 'A');

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('When the onBlur prop is provided', () => {
    test('Then the onBlur handler should be called when the input loses focus', async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();

      render(
        <TextInput
          label="Country"
          value=""
          onChange={() => {}}
          onBlur={handleBlur}
        />
      );

      await user.click(screen.getByRole('textbox', { name: 'Country' }));
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('When used as a controlled component', () => {
    function ControlledTextInput() {
      const [inputValue, setInputValue] = useState('');
      return (
        <TextInput
          label="Controlled Input"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      );
    }

    test('Then the input value should update as the user types', async () => {
      const user = userEvent.setup();

      render(<ControlledTextInput />);

      await user.type(
        screen.getByRole('textbox', { name: 'Controlled Input' }),
        'Hello'
      );

      expect(
        screen.getByRole('textbox', { name: 'Controlled Input' })
      ).toHaveValue('Hello');
    });
  });
});
