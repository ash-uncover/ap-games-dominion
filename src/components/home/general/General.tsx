import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// CSS
import './General.css'

interface GeneralProperties {}

export const General = ({
}: GeneralProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  // #endregion

  // #region Events
  function handleGamesClick() {
    navigate('/games');
  }
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-general'>
      <h2>General</h2>
      <div>
        <button onClick={handleGamesClick}>
          Play Local
        </button>
      </div>
      <div>
        <button disabled={true}>
          Play Online
        </button>
      </div>
      <div>
        <button>
          Settings
        </button>
      </div>
    </div>
  )
  // #endregion
}


