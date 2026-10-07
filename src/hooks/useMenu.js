import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { getMenu } from '../services/menuService'

export function useMenu() {
  const [attempt, setAttempt] = useState(0)
  const [menuState, setMenuState] = useState({
    status: 'loading',
    items: [],
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadMenu() {
      try {
        const items = await getMenu(controller.signal)
        if (!controller.signal.aborted) {
          // Una sola actualización atómica evita renders intermedios con datos y error desincronizados.
          setMenuState({ status: 'success', items, error: '' })
        }
      } catch (error) {
        if (axios.isCancel(error) || controller.signal.aborted) {
          return
        }

        setMenuState({
          status: 'error',
          items: [],
          error: error instanceof Error ? error.message : 'No pudimos cargar el menú.',
        })
      }
    }

    loadMenu()
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setMenuState({ status: 'loading', items: [], error: '' })
    setAttempt((currentAttempt) => currentAttempt + 1)
  }, [])

  return { ...menuState, retry }
}
