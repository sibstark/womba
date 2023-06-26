import { Card } from '@ui/components'
import { LeaderBoard, withProtection } from '@containers'

const leaders = [
  {
    avatar: 'https://dummyimage.com/50.jpg',
    nickName: 'Nick_A',
    score: 50,
  },
  {
    avatar: 'https://dummyimage.com/50.jpg',
    nickName: 'Nick_B',
    score: 10,
  },
]

export const LeaderBoardPage = withProtection(() => {
  return (
    <Card className="login-page">
      <h3>Лучшие игроки</h3>
      <LeaderBoard leaders={leaders} />
    </Card>
  )
})
