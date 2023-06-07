import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormError,
  Input,
  Label,
} from '../../ui/components'
// import { validateLengthCommon, validateLengthName } from '../../utils/profile'
import { profileController } from 'src/controllers/profile-controller'
import './styles.scss'

const validateLengthName = () => true
const validateLengthCommon = () => true

const ProfileForm: React.FC = () => {
  const [isEditMode, setEditMode] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }

  const switchEditMode = () => {
    setEditMode(prev => !prev)
  }
  console.log(errors)
  return (
    <>
      <button onClick={switchEditMode} className="link">
        Редактировать
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Имя</Label>
          <Input
            {...register('name', {
              validate: validateLengthName,
            })}
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
          {errors.name && (
            <FormError className="form-error--shown">*</FormError>
          )}
        </FormControl>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Фамилия</Label>
          <Input
            {...register('lastName', {
              validate: validateLengthName,
            })}
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
          {errors.name && (
            <FormError className="form-error--shown">*</FormError>
          )}
        </FormControl>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Никнейм</Label>
          <Input
            {...register('nickName', {
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
        {isEditMode && (
          <>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Пароль</Label>
              <Input
                {...register('password')}
                className="input--profile"
                disabled={!isEditMode}
                type="password"
                placeholder=""
              />
            </FormControl>
            <FormControl className="form-control form-control--profile">
              <Label className="form-label--profile">Пароль еще раз</Label>
              <Input
                {...register('confirmPassword', {
                  required: 'Обязательно',
                  validate: (pass: string) => {
                    if (watch('password') !== pass) {
                      return 'Пароли не совпадают'
                    }
                    return true
                  },
                })}
                className="input--profile"
                disabled={!isEditMode}
                type="password"
                placeholder=""
              />
              {errors.confirmPassword && (
                <FormError className="form-error--shown">
                  {errors?.confirmPassword?.message as string}
                </FormError>
              )}
            </FormControl>
            <FormControl className="form-control form-control--button">
              <Button
                type="submit"
                className="button button--blue button--center">
                Сохранить
              </Button>
            </FormControl>
          </>
        )}
      </form>
    </>
  )
}

export default ProfileForm
