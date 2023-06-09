import { FieldValues } from 'react-hook-form/dist/types/fields'
import { TChildrenArguments } from '@containers'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import React from 'react'
import { FormControl, FormError, Input, Label } from '@ui/components'
import classnames from 'classnames'

type FormControlInputTemplateProps<T extends FieldValues> =
  TChildrenArguments<T> & {
    title?: string
    placeholder: string
    name: FieldPath<T>
    options?: RegisterOptions<T>
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    disabled?: boolean
  }

export const FormControlInputTemplate = <T extends FieldValues>({
  register,
  formState: { errors },
  title,
  placeholder,
  name,
  options,
  disabled,
  inputProps = {},
}: FormControlInputTemplateProps<T>) => {
  const error = errors[name] as Record<string, string> | undefined
  return (
    <FormControl>
      {title && <Label>{title}</Label>}
      <Input
        {...inputProps}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name, options)}
        className={classnames({ 'input--error': error })}
      />
      {error && (
        <FormError className="form-error--shown">{error.message}</FormError>
      )}
    </FormControl>
  )
}
