import { Button, FormControl } from '@ui/components'
import { setLogin, setPassword } from '@pages/login/redux/actions'
import { FormControlInputTemplate, TChildrenArguments, withForm } from '../form'
import React, { useCallback, useMemo } from 'react'
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

  const onChangeLogin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setLogin(e.target.value))
    },
    []
  )

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPassword(e.target.value))
    },
    []
  )

  const options = useMemo(
    () => ({
      required: ValidationMessage.Required,
    }),
    []
  )

  return (
    <>
      <FormControlInputTemplate<TLoginForm>
        {...props}
        title="Логин"
        placeholder="Логин"
        name="login"
        options={options}
        onChange={onChangeLogin}
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
        onChange={onChangePassword}
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
