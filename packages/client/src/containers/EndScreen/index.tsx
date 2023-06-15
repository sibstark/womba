import { Button } from '@ui/components'
import { NavLink } from 'react-router-dom'
import { Typography } from '../../ui/components/Typography'

export const EndScreen = () => {
  return <div className='end__wrapper'>
    <Typography variant='h2' component='h2'>Конец игры</Typography>
    <Typography variant='p' component='p'>Ваш счет:</Typography>
    <Typography variant='p' component='p'>2048</Typography>
    <Button className='end__btn'>Заново</Button>
    <NavLink className='end__btn' to={'/'}>На главную</NavLink>
  </div>
}