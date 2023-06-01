import { Button, FormControl, FormError, Input, Label } from '@ui/components'

export const RegistrationForm = () => {
  return (
    <form>
      <FormControl>
        <Label>Имя</Label>
        <Input placeholder="Имя" name="name" />
        <FormError>Ошибка</FormError>
      </FormControl>
      <FormControl>
        <Label>Фамилия</Label>
        <Input className="input--error" name="surname" placeholder="Фамилия" />
        <FormError className="form-error--shown">Ошибка</FormError>
      </FormControl>
      <FormControl>
        <Label>Email</Label>
        <Input placeholder="Email" name="email" />
        <FormError>Ошибка</FormError>
      </FormControl>
      <FormControl>
        <Label>Телефон</Label>
        <Input placeholder="Телефон" name="phone" />
        <FormError>Ошибка</FormError>
      </FormControl>
      <FormControl>
        <Label>Логин</Label>
        <Input placeholder="Логин" name="login" />
        <FormError>Ошибка</FormError>
      </FormControl>
      <FormControl>
        <Label>Пароль</Label>
        <Input type="password" placeholder="Пароль" name="password" />
        <FormError>Ошибка</FormError>
      </FormControl>
      <FormControl>
        <Input
          type="password"
          placeholder="Пороль еще раз"
          name="confirmPassword"
        />
        <FormError>Ошибка</FormError>
      </FormControl>
      <Button type="submit" className="button--blue w-100">
        Зарегистрироваться
      </Button>
    </form>
  )
}
