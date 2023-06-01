import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { UseFormProps } from 'react-hook-form/dist/types'
import {
  SubmitErrorHandler,
  UseFormReturn,
} from 'react-hook-form/dist/types/form'

type OmitHandleSubmit<T> = Omit<T, 'handleSubmit'>
export type TChildrenArguments<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = OmitHandleSubmit<UseFormReturn<TFieldValues, TContext, TTransformedValues>>
export type TWithFormChildren<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = (
  props: TChildrenArguments<TFieldValues, TContext, TTransformedValues>
) => React.ReactNode
type TWithFormParams<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = {
  onValid: TTransformedValues extends FieldValues
    ? SubmitHandler<TTransformedValues>
    : SubmitHandler<TFieldValues>
  onInvalid?: SubmitErrorHandler<TFieldValues>
  props?: UseFormProps<TFieldValues, TContext>
}
export function withForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  params: TWithFormParams<TFieldValues, TContext, TTransformedValues>,
  children: TWithFormChildren<TFieldValues, TContext, TTransformedValues>
) {
  return function WrappedComponent() {
    const { onValid, onInvalid, props } = params
    const { handleSubmit, ...rest } = useForm<
      TFieldValues,
      TContext,
      TTransformedValues
    >(props)
    // @ts-ignore
    return (
      <form onSubmit={handleSubmit(onValid, onInvalid)}>{children(rest)}</form>
    )
  }
}
