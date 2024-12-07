import React, { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Home } from '../components/home/Home'
import { HomeIndex } from '../components/home/HomeIndex'
import { HomePlay } from '../components/home/play/HomePlay'
import { HomePlayNew } from '../components/home/play/new/HomePlayNew'
import { HomePlayOnline } from '../components/home/play/online/HomePlayOnline'
import { HomePlayLoad } from '../components/home/play/load/HomePlayLoad'
import { HomeSettings } from '../components/home/settings/HomeSettings'
import { HomeSettingsGame } from '../components/home/settings/game/HomeSettingsGame'
import { HomeSettingsDisplay } from '../components/home/settings/display/HomeSettingsDisplay'
import { HomeSettingsAudio } from '../components/home/settings/audio/HomeSettingsAudio'
import { HomeCredits } from '../components/home/credits/HomeCredits'

export const RouteRoot = () => {
  // #region Hooks
  // #endregion

  // #region Rendering
  return (
    <Routes>
      <Route path='' element={<Home />} >
        <Route index element={<HomeIndex />} />
        <Route path='play' element={<HomePlay />} />
        <Route path='play/new' element={<HomePlayNew />} />
        <Route path='play/online' element={<HomePlayOnline />} />
        <Route path='play/load' element={<HomePlayLoad />} />
        <Route path='settings' element={<HomeSettings />} />
        <Route path='settings/game' element={<HomeSettingsGame />} />
        <Route path='settings/display' element={<HomeSettingsDisplay />} />
        <Route path='settings/audio' element={<HomeSettingsAudio />} />
        <Route path='credits' element={<HomeCredits />} />
      </Route>
      <Route path='game'>
        <Route path='local'>
          <Route path='lobby'></Route>
          <Route path='player'></Route>
          <Route path='*' element={<Navigate to='game/local/lobby' replace={true} />} />
        </Route>
        <Route path='online'>
          <Route path='lobby'></Route>
          <Route path='player'></Route>
          <Route path='*' element={<Navigate to='game/online/lobby' replace={true} />} />
        </Route>
        <Route path='*' element={<Navigate to='/play' replace={true} />} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace={true} />} />
    </Routes>
  )
  // #endregion
}
