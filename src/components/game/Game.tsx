import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Stores
import GameSlice from '../../store/game/game.slice'
import GameSelectors from '../../store/game/game.selectors'
// Components
import { GameContainer } from './GameContainer'
import { Map } from './map/Map'
import { TilePanel } from './tilepanel/TilePanel'
import { UnitPanel } from './unitpanel/UnitPanel'
// CSS
import './Game.css'

interface GameProperties {
}

export const Game = ({
}: GameProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const turn = useSelector(GameSelectors.turn)
  useEffect(() => {
    dispatch(GameSlice.actions.start({ 
      map: { width: 10, height: 10 },
      players: [
        { name: 'aSH', nation: 'N1' },
        { name: 'Ji', nation: 'N2' }
      ]
    }))
  }, [])
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-game'>
      <header className='ap-dom-game_header'>
        {`Turn n°${turn}`}
      </header>
      <main className='ap-dom-game_main'>
        <GameContainer>
          <Map />
        </GameContainer>
        <TilePanel />
        <UnitPanel />
      </main>
      <footer className='ap-dom-game_footer'></footer>
    </div>
  )
  // #endregion
}
