import { Button } from '@ui/components'
import { TChildrenArguments, withForm, FormControlInputTemplate } from '../form'
import React from 'react'
import {
  emailValidation,
  loginValidation,
  nameValidation,
  passValidation,
  phoneValidation,
} from '@utils'

type TRegistrationForm = {
  name: string
  surname: string
  email: string
  phone: string
  login: string
  password: string
  confirmPassword: string
}
type RenderRegistrationFormProps = TChildrenArguments<TRegistrationForm>
const onSubmit = (
  values: TRegistrationForm,
  helpers: RenderRegistrationFormProps
) => {
  const { setError } = helpers
  console.log(values)
}

const RenderRegistrationForm: React.FC<RenderRegistrationFormProps> = props => {
  const { formState, watch } = props
  const { errors } = formState
  return (
    <>
      <FormControlInputTemplate<TRegistrationForm>
        {...props}
        placeholder="Имя"
        name="name"
        title="Имя"
        options={{
          required: 'Обязательно',
          validate: nameValidation,
        }}
      />
      <FormControlInputTemplate<TRegistrationForm>
        {...props}
        placeholder="Фамилия"
        name="surname"
        title="Фамилия"
        options={{
          required: 'Обязательно',
          validate: nameValidation,
        }}
      />
      <FormControlInputTemplate<TRegistrationForm>
        {...props}
        placeholder="Email"
        name="email"
        title="Email"
        options={{
          required: 'Обязательно',
          validate: emailValidation,
        }}
      />
      <FormControlInputTemplate<TRegistrationForm>
        {...props}
        placeholder="Телефон"
        name="phone"
        title="Телефон"
        options={{
          required: 'Обязательно',
          validate: phoneValidation,
        }}
      />
      <FormControlInputTemplate<TRegistrationForm>
        {...props}
        placeholder="Логин"
        name="login"
        title="Логин"
        options={{
          required: 'Обязательно',
          validate: loginValidation,
        }}
      />
      <FormControlInputTemplate<TRegistrationForm>
        {...props}
        placeholder="Пароль"
        name="password"
        title="Пароль"
        options={{
          required: 'Обязательно',
          validate: passValidation,
        }}
        inputProps={{
          type: 'password',
        }}
      />
      <FormControlInputTemplate<TRegistrationForm>
        {...props}
        placeholder="Пороль еще раз"
        name="confirmPassword"
        options={{
          required: 'Обязательно',
          validate: (val: string) => {
            if (watch('password') !== val) {
              return 'Пароли не совпадают'
            }
            return true
          },
        }}
        inputProps={{
          type: 'password',
        }}
      />
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
