import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormError,
  Input,
  Label,
} from '../../ui/components'
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

const validateLengthName = () => true
const validateLengthCommon = () => true

const ProfileForm: React.FC = () => {
  const [isEditMode, setEditMode] = useState<boolean>(false)
  const [isPasswordMode, setPasswordMode] = useState<boolean>(false)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => {
    if (isEditMode) {
      profileController.updateProfile(data)
    }
    if (isPasswordMode) {
      profileController.updatePassword(data)
    }
  }

  const switchEditMode = () => {
    setEditMode(prev => !prev)
    setPasswordMode(false)
  }

  const switchPasswordMode = () => {
    setPasswordMode(prev => !prev)
    setEditMode(false)
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
      <button onClick={switchEditMode} className="link">
        {!isEditMode && 'Редактировать профиль'}
        {isEditMode && 'Вернуться'}
      </button>
      <button onClick={switchPasswordMode} className="link">
        {!isPasswordMode && 'Обновить пароль'}
        {isPasswordMode && 'Вернуться'}
      </button>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isPasswordMode && (
          <>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Имя</Label>
              <Input
                {...register('first_name', {
                  validate: validateLengthName,
                })}
                className="input--profile"
                disabled={!isEditMode}
                placeholder=""
                type="text"
              />
              {errors.name && (
                <FormError className="form-error--shown">*</FormError>
              )}
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Фамилия</Label>
              <Input
                {...register('second_name', {
                  validate: validateLengthName,
                })}
                className="input--profile"
                disabled={!isEditMode}
                placeholder=""
                type="text"
              />
              {errors.name && (
                <FormError className="form-error--shown">*</FormError>
              )}
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Никнейм</Label>
              <Input
                {...register('display_name', {
                  validate: validateLengthCommon,
                })}
                className="input--profile"
                disabled={!isEditMode}
                placeholder=""
                type="text"
              />
              {errors.name && (
                <FormError className="form-error--shown">*</FormError>
              )}
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Email</Label>
              <Input
                {...register('email', {
                  validate: validateLengthCommon,
                })}
                className="input--profile"
                disabled={!isEditMode}
                type="email"
                placeholder=""
              />
              {errors.name && (
                <FormError className="form-error--shown">*</FormError>
              )}
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Телефон</Label>
              <Input
                {...register('phone', {
                  validate: validateLengthCommon,
                })}
                className="input--profile"
                disabled={!isEditMode}
                type="phone"
                placeholder=""
              />
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Login</Label>
              <Input
                {...register('login', {
                  validate: validateLengthCommon,
                })}
                className="input--profile"
                disabled={!isEditMode}
                placeholder=""
              />
              {errors.name && (
                <FormError className="form-error--shown">*</FormError>
              )}
            </FormControl>
          </>
        )}
        {isPasswordMode && (
          <>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Текущий пароль</Label>
              <Input
                {...register('oldPassword')}
                className="input--profile"
                type="password"
                placeholder=""
              />
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Пароль</Label>
              <Input
                {...register('newPassword')}
                className="input--profile"
                type="password"
                placeholder=""
              />
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Пароль еще раз</Label>
              <Input
                {...register('confirmPassword', {
                  // required: 'Обязательно',
                  validate: (pass: string) => {
                    if (watch('password') !== pass) {
                      return 'Пароли не совпадают'
                    }
                    return true
                  },
                })}
                className="input--profile"
                type="password"
                placeholder=""
              />
              {errors.confirmPassword && (
                <FormError className="form-error--shown">
                  {errors?.confirmPassword?.message as string}
                </FormError>
              )}
            </FormControl>
          </>
        )}
        {(isEditMode || isPasswordMode) && (
          <FormControl className="form-control form-control--button">
            <Button
              type="submit"
              className="button button--blue button--center">
              Сохранить
            </Button>
          </FormControl>
        )}
      </form>
    </>
  )
}

export default ProfileForm
