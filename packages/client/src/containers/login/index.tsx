import { Button, FormControl } from '@ui/components'
import { FormControlInputTemplate, TChildrenArguments, withForm } from '../form'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../Router'
import { authController } from '@controllers'
import { ValidationMessage } from '@utils'
import { User } from '@types'
import { useDispatch } from 'react-redux'
import { setUser } from '@pages/login/redux/actions'

type TLoginForm = {
  login: string
  password: string
}

type RenderLoginFormProps = TChildrenArguments<TLoginForm>

const onSubmit = (values: TLoginForm, helpers: RenderLoginFormProps) => {
  authController
    .signIn(values)
    .then(() => {
      console.log('login')
    })
    .catch(err => {
      console.log('signin error', err)
    })
    .finally(() => {
      authController
        .fetchUser()
        .then((user: User) => {
          const dispatch = useDispatch()
          dispatch(setUser(user))
        })
        .catch(e => {
          alert(`Ошибка получения информации о пользователе: ${e.reason}`)
          console.log('Error', e)
        })
    })
}

const RenderLoginForm: React.FC<RenderLoginFormProps> = props => {
  const { formState } = props

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
