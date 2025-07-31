import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './GameContainer.css'

const SCALES = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.4, 1.8, 2.3, 2.8, 3.4, 4]

interface GameContainerProperties extends PropsWithChildren {
}

export const GameContainer = ({
  children
}: GameContainerProperties) => {

  // #region > Hooks //
  const ref = useRef<HTMLDivElement>(null)
  const refContent = useRef<HTMLDivElement>(null)
  
  const [scale, setScale] = useState<number>(Math.round(SCALES.length / 2) - 1)
  const [moving, setMoving] = useState<boolean>(false)
  const [translateX, setTranslateX] = useState<number>(0)
  const [translateY, setTranslateY] = useState<number>(0)

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('wheel', handleWheel)
      ref.current.addEventListener('mousedown', handleMouseDown)
      ref.current.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('wheel', handleWheel)
        ref.current.removeEventListener('mousedown', handleMouseDown)
        ref.current.removeEventListener('mouseup', handleMouseUp)
      } 
    }
  }, [])

  useEffect(() => {
    if (moving) {
      document.addEventListener('mousemove', handleDocumentMouseMove)
    }
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove)
    }
  }, [moving])

  useEffect(() => {
    if (refContent.current) {
      refContent.current.style.scale = `${SCALES[scale]}`
      refContent.current.style.translate = `${translateX}px ${translateY}px`
    }
  }, [scale, translateX, translateY])

  // #endregion
  
  // #region > Events
  function handleDocumentMouseMove() {
    console.log('moving')
  }

  function handleWheel (event: any) {
    setScale((scale) => {
      if (event.wheelDelta > 0 && scale < SCALES.length - 1) {
        return scale + 1
      } else if (event.wheelDelta < 0 && scale > 0) {
        return scale - 1
      }
      return scale
    })
  }

  function handleMouseDown (event: any) {
    if (event.button === 0) {
      setMoving(true)
    }
  }

  function handleMouseUp (event: any) {
    if (event.button === 0) {
      setMoving(false)
    }
  }
  // #endregion

  // #region > Render
  const classes = ['ap-dom-game-container']
  if (moving) {
    classes.push('ap-dom-game-container--moving')
  }

  const classesContent = ['ap-dom-game-container_content']
  if (moving) {
    classes.push('ap-dom-game-container_content--moving')
  }

  return (
    <div 
      ref={ref}
      className={classes.join(' ')}
      draggable={false}
    >
      <span className='ap-dom-game-container_scaler'>
        scale: {scale}
      </span>
      <div 
        ref={refContent}
        className={classesContent.join(' ')}
        draggable={false}
      >
        {children}
      </div>
    </div>
  )
  // #endregion
}
