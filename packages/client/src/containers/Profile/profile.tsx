import { useState, useRef } from 'react'
// import { useForm } from 'react-hook-form'
import { Button, FormControl, FormError, Input, Label } from '@ui/components'
import { FormControlInputTemplate, withForm } from '../form'
import { TChildrenArguments } from '../form'
import {
  emailValidation,
  loginValidation,
  nameValidation,
  passValidation,
  phoneValidation,
  ValidationMessage,
} from '@utils'
import { profileController } from '@controllers'
import './styles.scss'

type TProfileForm = {
  first_name: string
  second_name: string
  display_name: string
  email: string
  phone: string
  login: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const onSubmit = (data: any) => {
  if (data.oldPassword && data.newPassword && data.confirmPassword) {
    profileController.updatePassword(data)
  } else {
    profileController.updateProfile(data)
  }
}

enum EditModes {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  PASS = 'PASSWORD',
}

type RenderProfileFormProps = TChildrenArguments<TProfileForm>
const RenderProfileForm: React.FC<RenderProfileFormProps> = props => {
  const [mode, setMode] = useState(EditModes.VIEW)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { formState, watch } = props

  const switchEditMode = () => {
    setMode(EditModes.EDIT)
  }

  const switchPasswordMode = () => {
    setMode(EditModes.PASS)
  }

  const switchViewMode = () => {
    setMode(EditModes.VIEW)
  }

  const onChooseAvatar = () => {
    inputFileRef.current?.click()
  }

  const onAvatarSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt && evt.target && evt.target.files) {
      const form = new FormData()
      form.append('avatar', evt.target.files[0], evt.target?.files[0].name)
      profileController.updateAvatar({
        data: form,
      })
    }
  }

  return (
    <>
      {mode !== EditModes.EDIT && (
        <Button onClick={switchEditMode} className="button--link">
          Редактировать профиль
        </Button>
      )}
      {mode !== EditModes.PASS && (
        <Button onClick={switchPasswordMode} className="button--link">
          Обновить пароль
        </Button>
      )}
      {mode !== EditModes.VIEW && (
        <Button onClick={switchViewMode} className="button--link">
          Отменить редактирование
        </Button>
      )}
      <FormControl className="form-control form-control--profile">
        <img
          onClick={onChooseAvatar}
          className="avatar"
          src="https://ya-praktikum.tech/api/v2/resources/5a632e9e-da0c-4e07-9493-8c2e3851fd6c/ad616c89-272c-421c-bf35-2906d41565c5_code.png"
        />
        <Input
          ref={inputFileRef}
          onChange={onAvatarSelect}
          className="visually-hidden"
          type="file"
          accept="image/*"
        />
      </FormControl>

      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {EditModes.PASS !== mode && (
        <>
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Имя"
            name="first_name"
            title="Имя"
            disabled={EditModes.EDIT !== mode}
            options={{
              required: ValidationMessage.Required,
              validate: nameValidation,
            }}
          />
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Фамилия"
            name="second_name"
            title="Фамилия"
            disabled={EditModes.EDIT !== mode}
            options={{
              required: ValidationMessage.Required,
              validate: nameValidation,
            }}
          />
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="NickName"
            name="display_name"
            title="NickName"
            disabled={EditModes.EDIT !== mode}
            options={{
              required: ValidationMessage.Required,
              validate: nameValidation,
            }}
          />
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="E-Mail"
            name="email"
            title="E-Mail"
            disabled={EditModes.EDIT !== mode}
            options={{
              required: ValidationMessage.Required,
              validate: emailValidation,
            }}
          />

          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Телефон"
            name="phone"
            title="Телефон"
            disabled={EditModes.EDIT !== mode}
            options={{
              required: ValidationMessage.Required,
              validate: phoneValidation,
            }}
          />

          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Login"
            name="login"
            title="Login"
            disabled={EditModes.EDIT !== mode}
            options={{
              required: ValidationMessage.Required,
              validate: loginValidation,
            }}
          />
        </>
      )}
      {EditModes.PASS === mode && (
        <>
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Текущий пароль"
            name="oldPassword"
            title="Текущий пароль"
            options={{
              required: ValidationMessage.Required,
              validate: passValidation,
            }}
            inputProps={{
              type: 'password',
            }}
          />
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Новый пароль"
            name="newPassword"
            title="Новый пароль"
            options={{
              required: ValidationMessage.Required,
              validate: passValidation,
            }}
            inputProps={{
              type: 'password',
            }}
          />
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Новый пароль еще раз"
            name="confirmPassword"
            options={{
              required: ValidationMessage.Required,
              validate: (val: string) => {
                if (watch('newPassword') !== val) {
                  return 'Пароли не совпадают'
                }
                return true
              },
            }}
            inputProps={{
              type: 'password',
            }}
          />
        </>
      )}
      {EditModes.VIEW !== mode && (
        <FormControl className="form-control form-control--button">
          <Button type="submit" className="button button--blue button--center">
            Сохранить
          </Button>
        </FormControl>
      )}
      {/* </form> */}
    </>
  )
}

// export default ProfileForm

export const ProfileForm = withForm<TProfileForm>(
  {
    onValid: onSubmit,
    props: {
      defaultValues: {},
    },
  },
  RenderProfileForm
)
