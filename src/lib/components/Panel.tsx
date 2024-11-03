import React, { PropsWithChildren } from 'react'
import './Panel.css'

interface PanelProperties extends PropsWithChildren {
  className?: string
  closable?: boolean
  title: string
  onClose?: () => void
}

export const Panel = ({
  className,
  closable,
  title,
  children,
  onClose
}: PanelProperties) => {

  // #region Events
  // #endregion

  // Rendering // 
  const classes = ['ap-dom-panel']
  if (className) {
    classes.push(className)
  }
  return (
    <div 
      className={classes.join(' ')}
    >
      <header className='ap-dom-panel_header'>
        {title}
        {closable ?
          <button 
            className='ap-dom-panel_header_action' 
            onClick={onClose}
          >
            close
          </button>
        : null}
      </header>
      {children}
    </div>
  )
  // #endregion
}
