import React from 'react'

import { MenuNavigationItem, MenuNavigationItemProperties } from './MenuNavigationItem'

import './MenuNavigationList.css'

export interface MenuNavigationListProperties {
  className?: string
  items: MenuNavigationItemProperties[]
}

export const MenuNavigationList = ({
  className,
  items
}: MenuNavigationListProperties) => {
  
  // #region > Render
  const classes = ['ap-menu-navigation-list']
  if (className) classes.push(className)
  return (
    <ul
      className={classes.join(' ')}
    >
      {items.map(item => <MenuNavigationItem key={item.name} {...item} />)}
    </ul>
  )
}
