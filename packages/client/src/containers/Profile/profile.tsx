import { useState, useRef } from 'react'
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
import { TProfileForm } from '@types'
import './styles.scss'

const onSubmit = (data: TProfileForm) => {
  if (data.oldPassword && data.newPassword && data.confirmPassword) {
    profileController.updatePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
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

  const isEditMode = () => mode === EditModes.EDIT
  const isPassMode = () => mode === EditModes.PASS
  const isViewMode = () => mode === EditModes.VIEW

  const onAvatarSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const form = new FormData()
      form.append('avatar', evt.target.files[0], evt.target?.files[0].name)
      profileController.updateAvatar({
        data: form,
      })
    }
  }

  return (
    <>
      {!isEditMode() && (
        <Button onClick={switchEditMode} className="button--link">
          Редактировать профиль
        </Button>
      )}
      {!isPassMode() && (
        <Button onClick={switchPasswordMode} className="button--link">
          Обновить пароль
        </Button>
      )}
      {!isViewMode() && (
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

      {!isPassMode() && (
        <>
          <FormControlInputTemplate<TProfileForm>
            {...props}
            placeholder="Имя"
            name="first_name"
            title="Имя"
            disabled={!isEditMode()}
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
            disabled={!isEditMode()}
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
            disabled={!isEditMode()}
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
            disabled={!isEditMode()}
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
            disabled={!isEditMode()}
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
            disabled={!isEditMode()}
            options={{
              required: ValidationMessage.Required,
              validate: loginValidation,
            }}
          />
        </>
      )}
      {isPassMode() && (
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
      {!isViewMode() && (
        <FormControl className="form-control form-control--button">
          <Button type="submit" className="button button--blue button--center">
            Сохранить
          </Button>
        </FormControl>
      )}
    </>
  )
}

export const ProfileForm = withForm<TProfileForm>(
  {
    onValid: onSubmit,
    props: {
      defaultValues: {},
    },
  },
  RenderProfileForm
)
