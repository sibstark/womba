import { Button } from '@ui/components'
import { NavLink } from 'react-router-dom'

export const EndScreen = () => {
  return <>
    <div className='end__wrapper'>
      <h2>Конец игры</h2>
      <p>Ваш счет:</p>
      <p>2048</p>
      <Button className='end__btn'>Заново</Button>
      <NavLink className='end__btn' to={'/'}>На главную</NavLink>
    </div>
  </>
}