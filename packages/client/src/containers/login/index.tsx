import { Button, FormControl } from '@ui/components'
import { FormControlInputTemplate, TChildrenArguments, withForm } from '../form'
import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../router'
import { ValidationMessage } from '@utils'
import { loginUser } from '@redux/user'
import { SigninRequest } from '@types'
import { dispatch } from '@redux/store'

type TLoginForm = {
  login: string
  password: string
}

type RenderLoginFormProps = TChildrenArguments<TLoginForm>
const options = {
  required: ValidationMessage.Required,
}
const RenderLoginForm: React.FC<RenderLoginFormProps> = props => {
  return (
    <>
      <FormControlInputTemplate<TLoginForm>
        {...props}
        title="Логин"
        placeholder="Логин"
        name="login"
        options={options}
      />
      <FormControlInputTemplate<TLoginForm>
        {...props}
        title="Пароль"
        placeholder="Пароль"
        name="password"
        options={options}
        inputProps={{
          type: 'password',
        }}
      />
      <FormControl>
        <Link to={Routes.Registration}>У вас нет аккаунта? Регистрация</Link>
      </FormControl>
      <Button type="submit" className="button--blue w-100">
        Авторизоваться
      </Button>
    </>
  )
}

export const LoginForm = withForm<SigninRequest>(
  {
    onValid: data => {
      dispatch(loginUser(data))
    },
    props: {
      defaultValues: {
        login: '',
        password: '',
      },
    },
  },
  RenderLoginForm
)
