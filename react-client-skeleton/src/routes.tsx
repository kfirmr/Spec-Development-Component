import type { JSX } from 'react'

interface IRoute {
  path: string
  element: JSX.Element
}

export const routes: IRoute[] = []