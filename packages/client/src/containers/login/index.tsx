import { Button, FormControl } from '@ui/components'
import { setLogin, setPassword } from '@pages/login/redux/actions'
import { FormControlInputTemplate, TChildrenArguments, withForm } from '../form'
import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../Router'
import { useDispatch } from 'react-redux'
import { authController } from '@controllers'
import { ValidationMessage } from '@utils'

type TLoginForm = {
  login: string
  password: string
}

type RenderLoginFormProps = TChildrenArguments<TLoginForm>

const onSubmit = (values: TLoginForm, helpers: RenderLoginFormProps) => {
  authController.signin(values)
  console.log(values)
}

const RenderLoginForm: React.FC<RenderLoginFormProps> = props => {
  const { formState } = props

  const dispatch = useDispatch()

  return (
    <>
      <FormControlInputTemplate<TLoginForm>
        {...props}
        title="Логин"
        placeholder="Логин"
        name="login"
        options={{
          required: ValidationMessage.Required,
        }}
        onChange={e => {
          dispatch(setLogin(e.target.value))
        }}
      />
      <FormControlInputTemplate<TLoginForm>
        {...props}
        title="Пароль"
        placeholder="Пароль"
        name="password"
        options={{
          required: ValidationMessage.Required,
        }}
        inputProps={{
          type: 'password',
        }}
        onChange={e => {
          dispatch(setPassword(e.target.value))
        }}
      />
      <FormControl>
        <Link to={Routes.Registration}>У вас нет аккаунта? Регистрация</Link>
      </FormControl>
      <Button
        type="submit"
        className="button--blue w-100"
        disabled={formState.isSubmitting}>
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
        login: '',
        password: '',
      },
    },
  },
  RenderLoginForm
)
