import React from 'react'
import { Outlet } from 'react-router-dom'
// CSS
import './Home.css'

interface HomeProperties {
}

export const Home = ({
}: HomeProperties) => {

  // #region Hooks
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-home'>
      <div className='ap-dom-home_content'>
        <Outlet />
      </div>
    </div>
  )
  // #endregion
}


