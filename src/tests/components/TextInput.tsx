import type { ChangeEvent, FocusEvent } from 'react';

export type TextInputProps = {
  /** The label for the input that forms the visual label and accessible name. */
  label: string;
  /** The function that is called when the input is changed. */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** The current value of the input. */
  value: string;
  /** The function that is called when the input is blurred. */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** The id to associate with the input. */
  id?: string;
  /** Whether the input is invalid. This sets the html `aria-invalid` attribute. */
  invalid?: boolean;
};

export const TextInput = ({
  id,
  invalid,
  label,
  onBlur,
  onChange,
  value,
}: TextInputProps) => {
  const inputId = id || 'input-id';
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input
        aria-invalid={invalid}
        id={inputId}
        onBlur={onBlur}
        onChange={onChange}
        type="text"
        value={value}
      />
    </>
  );
};
