import { Button, FormControl } from '@ui/components'
import { FormControlInputTemplate, TChildrenArguments, withForm } from '../form'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../Router'
import { ValidationMessage } from '@utils'
import { useDispatch } from 'react-redux'
import { loginUser } from '@pages/login/slice'

type TLoginForm = {
  login: string
  password: string
}

type RenderLoginFormProps = TChildrenArguments<TLoginForm>

const RenderLoginForm: React.FC<RenderLoginFormProps> = props => {
  const dispatch = useDispatch()
  const [auth, setAuth] = useState({ login: '', password: '' })

  const options = useMemo(
    () => ({
      required: ValidationMessage.Required,
    }),
    []
  )

  const onSubmit = () => {
    dispatch(loginUser(auth))
  }

  return (
    <>
      <FormControlInputTemplate<TLoginForm>
        {...props}
        title="Логин"
        placeholder="Логин"
        name="login"
        options={options}
        onChange={e => {
          setAuth({
            login: e.target.value,
            password: auth.password,
          })
        }}
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
        onChange={e => {
          setAuth({
            login: auth.login,
            password: e.target.value,
          })
        }}
      />
      <FormControl>
        <Link to={Routes.Registration}>У вас нет аккаунта? Регистрация</Link>
      </FormControl>
      <Button type="submit" className="button--blue w-100" onClick={onSubmit}>
        Авторизоваться
      </Button>
    </>
  )
}

export const LoginForm = withForm<TLoginForm>(
  {
    onValid: () => console.log('onValid'),
    props: {
      defaultValues: {
        login: '',
        password: '',
      },
    },
  },
  RenderLoginForm
)
