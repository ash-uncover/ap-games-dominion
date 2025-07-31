import React, { useEffect, useState } from 'react'
// Local Stuff
import { findItemDefinition, flattenMenu, getParent, IMenu, IMenuItemDef } from './MenuUtil'
import { MenuNavigationList } from './MenuNavigationList'
// CSS
import './Menu.css'
import { ICONS } from '@sol.ac/react-commons'

// #region Declaration
export interface MenuProperties {
  className?: string
  collapsed?: boolean
  menu: IMenu
  onMenuToggle?: () => void
}
// #endregion

// #region Component
export const Menu = ({
  className,
  collapsed,
  menu,
  onMenuToggle
}: MenuProperties) => {

  // #region > Hooks
  const [itemsDef, setItemsDef] = useState<IMenuItemDef[]>([])
  useEffect(() => {
    if (menu) {
      const itemsDef = flattenMenu(menu)
      setItemsDef(itemsDef)
    } else {
      setItemsDef([])
    }
  }, [menu])

  const [itemSelection, setItemSelection] = useState<IMenuItemDef>(null)
  useEffect(() => {
    if (itemsDef.length) {
      setItemSelection(itemsDef[0])
    }
  }, [itemsDef])

  const [itemSelected, setItemSelected] = useState<IMenuItemDef>(null)
  useEffect(() => {
    if (itemSelection) {
      if (itemSelection.component) {
        setItemSelected(itemSelection)
      } else if (itemSelection.items?.length) {
        setItemSelected(itemSelection.items[0])
      }
    } else {
      setItemSelected(null)
    }
  }, [itemSelection])

  const [itemNavigation, setItemNavigation] = useState<IMenuItemDef>(null)
  useEffect(() => {
    if (itemSelection) {
      const parent = getParent(itemSelection)
      if (itemSelection.items?.length) {
        setItemNavigation(itemSelection)
      } else if (parent) {
        setItemNavigation(parent)
      }
    } else {
      setItemNavigation(null)
    }
  }, [itemSelection])

  const [itemComponent, setItemComponent] = useState<IMenuItemDef>(null)
  useEffect(() => {
    if (itemSelection) {
      if (itemSelection.component) {
        setItemComponent(itemSelection)
      } else if (itemSelection.items) {
        setItemComponent(findItemDefinition(itemsDef, itemSelection.items[0]))
      }
    } else {
      setItemComponent(null)
    }
  }, [itemSelection])

  useEffect(() => {
    console.log('-------------------')
    console.log('itemSelection', itemSelection)
  }, [itemSelection])
  useEffect(() => {
    console.log('itemSelected', itemSelected)
  }, [itemSelected])
  useEffect(() => {
    console.log('itemNavigation', itemNavigation)
  }, [itemNavigation])
  useEffect(() => {
    console.log('itemComponent', itemComponent)
  }, [itemComponent])
  // #endregion

  // #region > Events
  function selectItem(itemDef: IMenuItemDef) {
    // Resolve Selection
    if (itemSelection.items?.length) {
    }
    // Resolve Navigation
    // Resolve Component
    if (itemDef.component) {
      setItemComponent(itemDef)
    } else if (itemSelection.items) {
      setItemComponent(findItemDefinition(itemsDef, itemSelection.items[0]))
    }
  }
  // #endregion

  // #region > Render
  function buildMenuNavigationitem(itemDef: IMenuItemDef) {
    if (itemDef) {
      const items = itemDef.items.map(i => ({
        name: i.name,
        icon: i.icon,
        description: i.description,
        selected: itemSelected === i,
        onClick: () => setItemSelection(i)
      }))
      const parent = getParent(itemDef)
      if (parent) {
        items.push({
          name: 'back',
          description: 'back',
          icon: ICONS.FAS_RIGHT_FROM_BRACKET,
          selected: false,
          onClick: () => setItemSelection(getParent(itemNavigation))
        })
      }
      return items
    }
    return []
  }

  const classes = ['ap-menu']
  if (className) classes.push(className)
  if (collapsed) classes.push('ap-menu--collapsed')
  return (
    <div className={classes.join(' ')}>

      <div className='ap-menu__content'>
        {itemComponent ? itemComponent.component : null}
      </div>

      <nav className='ap-menu__navigation'>
        <MenuNavigationList
          items={buildMenuNavigationitem(itemNavigation)}
        />
      </nav>

    </div>
  )
  // #endregion
}
// #endregion
