import { Fragment, useEffect, useRef } from 'react'
import Canvas from './Canvas'
import Control from './Control'

export default function GameBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controlRef = useRef<HTMLButtonElement>(null)
  let count = 0
  let y = 350

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    let t = Date.now()
    let speed = 25

    function draw() {
      const timePassed = (Date.now() - t) / 1000
      t = Date.now()

      // clear the entire canvas
      context?.clearRect(0, 0, 600, 400)

      // ball
      context?.beginPath()
      context?.arc(300, y, 50, 0, 2 * Math.PI, false)
      context!.fillStyle = 'green'
      context?.fill()
      context?.stroke()

      // drawing the count value
      context!.font = '25px Arial'
      context!.fillStyle = 'white'
      context?.fillText('Count: ' + count, 20, 30)

      if (y <= 350) {
        speed += 20 * timePassed
        y += speed * timePassed
      }

      if (y > 350) {
        count = 0
        speed = 0
      }

      window.requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return (
    <Fragment>
      <Canvas ref={canvasRef}>
        Your browser does not support HTML5 canvas tag.
      </Canvas>
      <div className="my-5">
        <Control
          ref={controlRef}
          onClick={() => {
            count += 1
            y -= 25
          }}
          onKeyDown={() => {
            count += 1
            y -= 25
          }}
          onTouchStart={() => {
            count += 1
            y -= 25
          }}
        >
          Jump
        </Control>
      </div>
    </Fragment>
  )
}
