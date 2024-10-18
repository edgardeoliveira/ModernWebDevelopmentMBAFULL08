import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import UserPage from './pages/User'
import EditUserPage from './pages/User/edit'
import RolesPage from './pages/Roles'
import CreateRolesPage from './pages/CreateRoles'
import EditRolePage from './pages/CreateRoles/edit'

import './App.scss'

const router = createBrowserRouter([
  { path: '/', Component: LoginPage },
  { path: '/login', Component: LoginPage },
  { path: '/home', Component: HomePage },
  { path: '/user/create', Component: UserPage },
  { path: '/user/:id/edit', Component: EditUserPage },
  { path: '/perfil', Component: RolesPage },
  { path: '/perfil/create', Component: CreateRolesPage },
  { path: '/perfil/:id/edit', Component: EditRolePage },
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}