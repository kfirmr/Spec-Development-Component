import type { JSX } from 'react'
import ComponentsShowcase from './pages/ComponentsShowcase.tsx'

interface IRoute {
  path: string
  element: JSX.Element
}

export const routes: IRoute[] = [
  { path: '/', element: <ComponentsShowcase /> },
]