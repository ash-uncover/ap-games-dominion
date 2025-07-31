import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './MenuNavigationItem.css'

export interface MenuNavigationItemProperties {
  className?: string
  name: string
  description?: string
  icon: IconProp
  selected?: boolean
  onClick: () => void
}

export const MenuNavigationItem = ({
  className,
  name,
  description,
  icon,
  selected,
  onClick
}: MenuNavigationItemProperties) => {

  // #region > Events
  function handleClick() {
    onClick()
  }
  // #endregion

  // #region > Render
  const classes = ['ap-menu-navigation-item']
  if (className) classes.push(className)
  if (selected) classes.push('ap-menu-navigation-item--selected')
  return (
    <li
      className={classes.join(' ')}
      title={description}
      onClick={handleClick}
    >
      <FontAwesomeIcon
        className='ap-menu-navigation-item__icon'
        icon={icon}
      />
      <div className='ap-menu-navigation-item__text'>
        {name}
      </div>
    </li>
  )
}
