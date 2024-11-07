import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

interface GameRedirectProperties {}

export const GameRedirect = ({
}: GameRedirectProperties) => {

  // #region Hooks
  let { gameId } = useParams();  
  // #endregion

  // #region Rendering
  return (
    <Navigate
      to={`/games/${gameId}`}
      replace={true}
    />    
  )
  // #endregion
}


