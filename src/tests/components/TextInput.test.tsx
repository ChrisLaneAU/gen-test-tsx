// Created at: 2024-06-09

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { TextInput } from './TextInput';

describe('Given a TextInput is rendered', () => {
  describe('When the label prop is provided', () => {
    test('Then the input should be visible with the accessible name from the label', () => {
      render(<TextInput label="First Name" onChange={() => {}} value="" />);

      expect(screen.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    });
  });

  describe('When the value prop is provided', () => {
    test('Then the input should display the provided value', () => {
      render(
        <TextInput
          label="Email Address"
          onChange={() => {}}
          value="user@example.com"
        />
      );

      expect(
        screen.getByRole('textbox', { name: 'Email Address' })
      ).toHaveValue('user@example.com');
    });
  });

  describe('When the id prop is provided', () => {
    test('Then the label should be associated with the input via htmlFor and id', () => {
      render(
        <TextInput
          label="Username"
          onChange={() => {}}
          value=""
          id="custom-id"
        />
      );

      expect(screen.getByRole('textbox', { name: 'Username' }).id).toBe(
        'custom-id'
      );
    });
  });

  describe('When the invalid prop is true', () => {
    test('Then the input should have aria-invalid set to true', () => {
      render(
        <TextInput label="Password" onChange={() => {}} value="" invalid />
      );

      expect(screen.getByRole('textbox', { name: 'Password' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  });

  describe('When the invalid prop is false', () => {
    test('Then the input should have aria-invalid set to false', () => {
      render(
        <TextInput
          label="Password"
          onChange={() => {}}
          value=""
          invalid={false}
        />
      );

      expect(screen.getByRole('textbox', { name: 'Password' })).toHaveAttribute(
        'aria-invalid',
        'false'
      );
    });
  });

  describe('When the onChange prop is provided', () => {
    test('Then the onChange handler should be called when the user types', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<TextInput label="City" onChange={handleChange} value="" />);

      await user.type(screen.getByRole('textbox', { name: 'City' }), 'London');

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
          onChange={() => {}}
          onBlur={handleBlur}
          value=""
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
