import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Stores
import GameSlice from '../../store/game/game.slice'
import GameSelectors from '../../store/game/game.selectors'
// Components
import { GameContainer } from './GameContainer'
import { GameHeader } from './GameHeader'
import { Map } from './map/Map'
import { TilePanel } from './tilepanel/TilePanel'
import { UnitPanel } from './unitpanel/UnitPanel'
import { UnitsPanel } from './unitspanel/UnitsPanel'
// CSS
import './Game.css'

interface GameProperties {
}

export const Game = ({
}: GameProperties) => {

  // #region Hooks
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-game'>
      <GameHeader />
      <main className='ap-dom-game_main'>
        <GameContainer>
          <Map />
        </GameContainer>
        <TilePanel />
        <UnitPanel />
        <UnitsPanel />
      </main>
      <footer className='ap-dom-game_footer'></footer>
    </div>
  )
  // #endregion
}
