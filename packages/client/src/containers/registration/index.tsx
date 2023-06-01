import { Button, FormControl, FormError, Input, Label } from '@ui/components'
import { TChildrenArguments, withForm } from '../form'
import React from 'react'
import { classnames } from '@utils'

type TRegistrationForm = {
  name: string
  surname: string
  email: string
  phone: string
  login: string
  password: string
  confirmPassword: string
}

const onSubmit = (values: TRegistrationForm) => {
  console.log(values)
}

type RenderRegistrationFormProps = TChildrenArguments<TRegistrationForm>
const RenderRegistrationForm: React.FC<RenderRegistrationFormProps> = ({
  register,
  formState,
}) => {
  const { errors } = formState
  return (
    <>
      <FormControl>
        <Label>Имя</Label>
        <Input
          placeholder="Имя"
          {...register('name')}
          className={classnames({ 'input--error': errors.name })}
        />
        {errors.name && (
          <FormError className="form-error--shown">
            {errors.name?.message}
          </FormError>
        )}
      </FormControl>
      <FormControl>
        <Label>Фамилия</Label>
        <Input
          placeholder="Фамилия"
          {...register('surname')}
          className={classnames({
            'input--error': errors.surname,
          })}
        />
        {errors.surname && (
          <FormError className="form-error--shown">
            {errors.surname?.message}
          </FormError>
        )}
      </FormControl>
      <FormControl>
        <Label>Email</Label>
        <Input
          placeholder="Email"
          {...register('email')}
          className={classnames({ 'input--error': errors.email })}
        />
        {errors.email && (
          <FormError className="form-error--shown">
            {errors.email?.message}
          </FormError>
        )}
      </FormControl>
      <FormControl>
        <Label>Телефон</Label>
        <Input
          placeholder="Телефон"
          {...register('phone')}
          className={classnames({ 'input--error': errors.phone })}
        />
        {errors.phone && (
          <FormError className="form-error--shown">
            {errors.phone?.message}
          </FormError>
        )}
      </FormControl>
      <FormControl>
        <Label>Логин</Label>
        <Input
          placeholder="Логин"
          {...register('login')}
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
          {...register('password')}
          className={classnames({ 'input--error': errors.password })}
        />
        {errors.password && (
          <FormError className="form-error--shown">
            {errors.password?.message}
          </FormError>
        )}
      </FormControl>
      <FormControl>
        <Input
          type="password"
          placeholder="Пороль еще раз"
          {...register('confirmPassword')}
          className={classnames({ 'input--error': errors.confirmPassword })}
        />
        {errors.confirmPassword && (
          <FormError className="form-error--shown">
            {errors.confirmPassword?.message}
          </FormError>
        )}
      </FormControl>
      <Button type="submit" className="button--blue w-100">
        Зарегистрироваться
      </Button>
    </>
  )
}

export const RegistrationForm = withForm<TRegistrationForm>(
  {
    onValid: onSubmit,
    props: {
      defaultValues: {
        name: 'Oleg',
        surname: '',
        email: '',
        phone: '',
        login: '',
        password: '',
        confirmPassword: '',
      },
    },
  },
  RenderRegistrationForm
)
