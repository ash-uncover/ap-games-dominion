import React from 'react'
import { Navigate, useParams } from 'react-router'

interface GameRedirectProperties {}

export const GameRedirect = ({
}: GameRedirectProperties) => {

  // #region > Hooks
  let { gameId } = useParams();
  // #endregion

  // #region > Render
  return (
    <Navigate
      to={`/games/${gameId}`}
      replace={true}
    />
  )
  // #endregion
}


