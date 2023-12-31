import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import About from './pages/About'
import Home from './pages/Home'

import '../server' // Import fake API server
import Vans, { loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, { loader as vanDetailLoader } from './pages/Vans/VanDetail'
import Layout from './components/Layout'
import Dashboard, { loader as dashboardLoader } from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans'
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFound from './pages/NotFound'
import Error from './components/Error'
import Login, {
  loader as loginLoader,
  action as loginAction,
} from './pages/Login'
import { protectedRoute } from './utils'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='*' element={<NotFound />} />
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route
        path='login'
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path='vans'
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route
        path='vans/:id'
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />

      <Route
        path='host'
        element={<HostLayout />}
        loader={async ({ request }) => await protectedRoute(request)}
      >
        <Route index element={<Dashboard />} loader={dashboardLoader} />
        <Route
          path='income'
          element={<Income />}
          loader={async ({ request }) => await protectedRoute(request)}
        />
        <Route
          path='vans'
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path='vans/:id'
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await protectedRoute(request)}
          />
          <Route
            path='pricing'
            element={<HostVanPricing />}
            loader={async ({ request }) => await protectedRoute(request)}
          />
          <Route
            path='photos'
            element={<HostVanPhotos />}
            loader={async ({ request }) => await protectedRoute(request)}
          />
        </Route>
        <Route
          path='reviews'
          element={<Reviews />}
          loader={async ({ request }) => await protectedRoute(request)}
        />
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
