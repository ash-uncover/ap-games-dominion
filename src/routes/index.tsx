import React from 'react'

import {
  Route,
  Routes,
} from 'react-router-dom'

import { App } from '../components/App'

import { Home } from '../components/home/Home'
import { Game } from '../components/game/Game'
import { Games } from '../components/home/games/Games'
import { GamePlayerSelector } from '../components/home/gameplayerselector/GamePlayerSelector'
import { GameSetup } from '../components/home/gamesetup/GameSetup'
import { General } from '../components/home/general/General'

import { GameLocalService } from '../service/games/GameLocalService'

export const RouteRoot = () => {

  // #region Rendering
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} >
          <Route path='games' element={<Games service={GameLocalService}/>} />
          <Route path='games/new' element={<GameSetup service={GameLocalService} />} />
          <Route path='games/:gameId' element={<GamePlayerSelector service={GameLocalService} />} />
          <Route index element={<General />} />
        </Route>
        <Route path='games/:gameId'>
          <Route path='player/:playerId' element={<Game />} />
        </Route>
      </Route>
    </Routes>
  )
  // #endregion
}