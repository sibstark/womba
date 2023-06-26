import { Theme } from '../../types/forum'

import { Header } from './components/header'
import { Row } from './components/row'

import './styles.scss'
import { withProtection } from '@containers'

const data: Theme[] = [
  {
    id: 1,
    title: 'Новые игры',
    themeCount: 222,
    answerCount: 345,
  },
  {
    id: 2,
    title: 'Геймдизайнеры',
    themeCount: 5,
    answerCount: 14,
  },
  {
    id: 3,
    title: 'Технологии',
    themeCount: 590,
    answerCount: 895,
  },
]

export const ForumPage = withProtection(() => {
  return (
    <div className="container">
      <Header />
      {data.map(el => (
        <Row {...el} key={el.id} />
      ))}
    </div>
  )
})
