import React from 'react'

import {
  useParams,
} from 'react-router'

import { GameHome } from '../../../components/game/GameHome'

export const GameRoute = ({
}) => {

  // #region > Hooks
  let { gameId } = useParams();
  // #endregion

  // #region > Render
  return (
    <GameHome
      gameId={gameId}
    />
  )
  // #endregion
}