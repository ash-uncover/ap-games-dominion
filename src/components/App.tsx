import React, { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { Game } from './game/Game'
import './App.css'

interface AppProperties {
  children?: ReactElement
}

export const App = ({
  children
}: AppProperties) => {

  // #region Hooks //
  const query = useQuery()
  // #endregion

  // Rendering //
  return (
    <div className='ap-dom-app'>
      <Game />
    </div>
  )
  // #endregion
}

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}
