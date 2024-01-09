import { styled } from 'styled-components';
import { TextField, Tooltip } from '@mui/material';
import { FieldProps, getIn } from 'formik';
import { ChangeEvent, useCallback } from 'react';

interface IInputProps extends FieldProps {
  label?: string;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder: string;
  type?: string;
  helperText: string;
  name: string;
  value: string;
  error?: string;
  onChange: (value: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = ({
  form,
  field,
  label,
  disabled = false,
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  ...props
}: IInputProps) => {
  const error = getIn(form.errors, field.name);

  const onChangeInternal = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);

    let newValue;
    if (type === 'number') {
      newValue = isNaN(parseInt(e.target.value, 10)) ? null : parseInt(e.target.value, 10);
    } else {
      newValue = e.target.value === '' ? null : e.target.value;
    }

    form.setFieldValue(field.name, newValue, false);
  }, [onChange, form, field]);

  return (
    <Input.Container>
      <Tooltip title={error}>
        <TextField
          {...props}
          size="small"
          fullWidth
          label={label}
          name={name}
          disabled={disabled}
          error={!!error}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChangeInternal}
        />
      </Tooltip>
    </Input.Container>
  );
};

Input.Container = styled.div`
  display        : flex;
  flex-direction : row;
  position       : relative;
`;
