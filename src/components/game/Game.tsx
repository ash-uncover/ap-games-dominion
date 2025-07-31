import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { DataStates } from '@sol.ac/js-utils'
// Stores
import GameSlice from '../../store/game/game.slice'
import GameSelectors from '../../store/game/game.selectors'
import { GameService } from '../../service/GameService'
import { getGameTurn } from '../../service/GameServiceHelper'
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
  service: GameService
}

export const Game = ({
  service
}: GameProperties) => {

  // #region > Hooks
  const dispatch = useDispatch()
  const params = useParams()
  const gameId = useSelector(GameSelectors.gameId)
  const playerId = useSelector(GameSelectors.playerId)
  const getGameTurnState = useSelector(GameSelectors.getGameTurnState)
  // #endregion

  // #region > Events
  useEffect(() => {
    dispatch(GameSlice.actions.getGameTurnOutdate())
  }, [])

  useEffect(() => {
    if (getGameTurnState == DataStates.OUTDATED) {
      getGameTurn(service, dispatch, params.gameId, params.playerId)
    }
  }, [params, getGameTurnState])
  // #endregion

  // #region > Render
  if (gameId !== params.gameId || playerId !== params.playerId) {
    return (
      <div className='ap-dom-game'>
        Loading
      </div>
    )
  }

  switch(getGameTurnState) {
    case DataStates.FAILURE: {
      return (
        <div className='ap-dom-game'>
          Error
        </div>
      )
    }
    case DataStates.NEVER:
    case DataStates.OUTDATED:
    case DataStates.FETCHING_FIRST:
    case DataStates.FETCHING: {
      return (
        <div className='ap-dom-game'>
          Loading
        </div>
      )
    }
    case DataStates.SUCCESS: {
      return (
        <div className='ap-dom-game'>
          <GameHeader
            service={service}
          />
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
    }
  }
  // #endregion
}
