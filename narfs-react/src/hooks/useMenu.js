import { useState, useEffect } from 'react'
import { defaultMenuItems } from '../data/menuData'

const STORAGE_KEY = 'narfs_menu_items'

export function useMenu() {
  const [menuItems, setMenuItemsState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultMenuItems
    } catch {
      return defaultMenuItems
    }
  })

  const setMenuItems = (items) => {
    setMenuItemsState(items)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore storage errors */
    }
  }

  return { menuItems, setMenuItems }
}
