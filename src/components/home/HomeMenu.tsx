import React from 'react'
import * as ReactI18n from 'react-i18next'
import { ICONS } from '@sol.ac/react-commons'
import { Menu } from '../../lib/components/menu/Menu'
// Local Stuff
import { Home } from './Home'
import { HomeSettingsGame } from './settings/game/HomeSettingsGame'
import { HomeSettingsAudio } from './settings/audio/HomeSettingsAudio'
import { HomeSettingsDisplay } from './settings/display/HomeSettingsDisplay'
import { HomeCredits } from './credits/HomeCredits'
import { HomePlayNew } from './play/new/HomePlayNew'
import { HomePlayOnline } from './play/online/HomePlayOnline'
import { HomePlayLoad } from './play/load/HomePlayLoad'
// CSS
import './HomeMenu.css'

// #region Component
export const HomeMenu = () => {

  // #region > Hooks
  const { t } = ReactI18n.useTranslation()
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <Menu
      className='ap-dom-home-menu'
      menu={{
        component: <Home />,
        items: [{
          name: t('home.play.name'),
          description: t('home.play.description'),
          icon: ICONS.FAS_GAMEPAD,
          items: [{
            name: t('home.play.new.name'),
            description: t('home.play.new.description'),
            confirmBack: true,
            icon: ICONS.FAS_USER,
            component: <HomePlayNew />,
          }, {
            name: t('home.play.online.name'),
            description: t('home.play.online.description'),
            icon: ICONS.FAS_USERS,
            component: <HomePlayOnline />,
          }, {
            name: t('home.play.load.name'),
            description: t('home.play.load.description'),
            icon: ICONS.FAS_DOWNLOAD,
            component: <HomePlayLoad />,
          }]
        }, {
          name: t('home.settings.name'),
          icon: ICONS.FAS_GEAR,
          items: [{
            name: t('home.settings.game.name'),
            description: t('home.settings.game.description'),
            icon: ICONS.FAS_WRENCH,
            component: <HomeSettingsGame />,
          }, {
            name: t('home.settings.display.name'),
            description: t('home.settings.display.description'),
            icon: ICONS.FAS_DESKTOP,
            component: <HomeSettingsDisplay />,
          }, {
            name: t('home.settings.audio.name'),
            description: t('home.settings.audio.description'),
            icon: ICONS.FAS_SLIDERS,
            component: <HomeSettingsAudio />,
          }]
        }, {
          name: t('home.credits.name'),
          description: t('home.credits.description'),
          icon: ICONS.FAS_GIFTS,
          component: <HomeCredits />
        }]
      }}
    />
  )
  // #endregion
}
// #endregion