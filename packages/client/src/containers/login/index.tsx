import { Button, FormControl, FormError, Input, Label } from '@ui/components'
import { TChildrenArguments, withForm } from '../form'
import React from 'react'
import { classnames } from '@utils'
import { Link } from 'react-router-dom'
import { Routes } from '../Router'

type TLoginForm = {
  login: string
  password: string
}
type RenderLoginFormProps = TChildrenArguments<TLoginForm>
const onSubmit = (values: TLoginForm, helpers: RenderLoginFormProps) => {
  const { setError } = helpers
  console.log(values)
}

const RenderLoginForm: React.FC<RenderLoginFormProps> = ({
  register,
  formState,
}) => {
  const { errors } = formState
  return (
    <>
      <FormControl>
        <Label>Логин</Label>
        <Input
          placeholder="Логин"
          {...register('login', {
            required: 'Обязательно',
          })}
          className={classnames({ 'input--error': errors.login })}
        />
        {errors.login && (
          <FormError className="form-error--shown">
            {errors.login?.message}
          </FormError>
        )}
      </FormControl>
      <FormControl>
        <Label>Пароль</Label>
        <Input
          type="password"
          placeholder="Пароль"
          {...register('password', {
            required: 'Обязательно',
          })}
          className={classnames({ 'input--error': errors.password })}
        />
        {errors.password && (
          <FormError className="form-error--shown">
            {errors.password?.message}
          </FormError>
        )}
      </FormControl>
      <FormControl>
        <Link to={Routes.Registration}>У вас нет аккаунта? Регистриация</Link>
      </FormControl>
      <Button type="submit" className="button--blue w-100">
        Авторизоваться
      </Button>
    </>
  )
}

export const LoginForm = withForm<TLoginForm>(
  {
    onValid: onSubmit,
    props: {
      defaultValues: {
        login: 'Oleg',
        password: '',
      },
    },
  },
  RenderLoginForm
)
