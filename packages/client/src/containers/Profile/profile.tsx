import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormError,
  Input,
  Label,
} from '../../ui/components'
import './style.scss'

const ProfileForm: React.FC = () => {
  const [isEditMode, setEditMode] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => console.log(data)

  const switchEditMode = () => {
    setEditMode(prev => !prev)
  }
  return (
    <>
      <button onClick={switchEditMode} className="link">
        Редактировать
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Имя</Label>
          <Input
            {...register('example')}
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
        </FormControl>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Фамилия</Label>
          <Input
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
        </FormControl>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Никнейм</Label>
          <Input
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
        </FormControl>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Email</Label>
          <Input
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
        </FormControl>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Телефон</Label>
          <Input
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
        </FormControl>
        <FormControl className="form-control form-control--profile">
          <Label className="form-label--profile">Пароль</Label>
          <Input
            className="input--profile"
            disabled={!isEditMode}
            placeholder=""
          />
        </FormControl>
        {isEditMode && (
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
