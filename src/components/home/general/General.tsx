import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, PanelButton } from '@uncover/games-common'
// CSS
import './General.css'

interface GeneralProperties {}

export const General = ({
}: GeneralProperties) => {

  // #region Hooks
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  // #endregion

  // #region Events
  function handleGamesClick() {
    navigate('/games');
  }
  // #endregion

  // #region Rendering
  const items = [{
    icon: <FontAwesomeIcon icon={['fas', 'gamepad']} />,
    selected: location.pathname === '/games',
    text: t('home.local.menu'),
    onClick: () => { navigate('/games') }
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'gamepad']} />,
    disabled: true,
    selected: location.pathname === '/online',
    text: t('home.online.menu'),
    onClick: () => { navigate('/online') }
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'gear']} />,
    selected: location.pathname === '/settings',
    text: t('home.settings.menu'),
    onClick: () => { navigate('/settings/general') }
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'gifts']} />,
    selected: location.pathname === '/credits',
    text: t('home.credits.menu'),
    onClick: () => { navigate('/credits') }
  }]

  return (
    <Menu
      title={t('home.title')}
      items={items}
    />
  )

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


