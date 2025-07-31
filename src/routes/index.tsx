import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { HomeMenu } from '../components/home/HomeMenu'

export const RouteRoot = () => {
  // #region > Hooks
  // #endregion

  // #region > Render
  return (
    <Routes>
      <Route path='' element={<HomeMenu />} />
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
