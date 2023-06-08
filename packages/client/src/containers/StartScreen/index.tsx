import { Button } from '@ui/components'

export const StartScreen = () => {
  return (
    <>
      <div className="start__wrapper">
        <div className="logo__wrapper">
          <h2>WOMBA</h2>
          <div className="logo">
            <p>2</p>
            <p>0</p>
            <p>4</p>
            <p>8</p>
          </div>
        </div>
        <Button className={'start__btn'}>Начать играть</Button>
      </div>
    </>
  )
}
