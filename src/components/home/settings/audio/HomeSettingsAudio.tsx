import React from 'react'
import { MenuItem } from '@uncover/games-common'
// CSS
import './HomeSettingsAudio.css'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

interface HomeSettingsAudioProperties {
}

export const HomeSettingsAudio = ({
}: HomeSettingsAudioProperties) => {

  // #region Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <main className='ap-dom-home-settings-audio'>
      SETTINGS AUDIO
      <button
        onClick={() => { navigate('/settings') }}
      >
        {t('BACK')}
      </button>
    </main>
  )
  // #endregion
}
