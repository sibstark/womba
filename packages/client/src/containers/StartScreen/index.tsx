import { Button } from '@ui/components'

export const StartScreen = () => {
  return (
      <div className="start__screen">
        <div className="start__screen-logo__wrapper">
          <h2>WOMBA</h2>
          <div className="start__screen-logo__wrapper-logo">
            <p>2</p>
            <p>0</p>
            <p>4</p>
            <p>8</p>
          </div>
        </div>
        <Button className={'start__screen-btn'}>Начать играть</Button>
      </div>
  )
}
