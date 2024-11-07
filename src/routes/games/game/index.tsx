import React from 'react'

import {
  useParams,
} from 'react-router-dom'

import { GameHome } from '../../../components/game/GameHome'

export const GameRoute = ({
}) => {

  // #region Hooks
  let { gameId } = useParams();  
  // #endregion

  // #region Rendering
  return (
    <GameHome 
      gameId={gameId} 
    />
  )
  // #endregion
}