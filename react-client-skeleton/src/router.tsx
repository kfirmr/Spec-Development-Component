import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes.tsx'

const fallbackRoute = {
  path: '*',
  element: <></>,
}

export const router = createBrowserRouter(
  routes.length > 0 ? routes : [fallbackRoute],
)