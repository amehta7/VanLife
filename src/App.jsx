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
import Dashboard from './pages/Host/Dashboard'
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
import Login, { loader as loginLoader } from './pages/Login'
import { protectedRoute } from './utils'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<Error />}>
      <Route path='*' element={<NotFound />} />
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} loader={loginLoader} />
      <Route path='vans' element={<Vans />} loader={vansLoader} />
      <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader} />

      <Route path='host' element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async () => await protectedRoute()}
        />
        <Route
          path='income'
          element={<Income />}
          loader={async () => await protectedRoute()}
        />
        <Route path='vans' element={<HostVans />} loader={hostVansLoader} />
        <Route
          path='vans/:id'
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async () => await protectedRoute()}
          />
          <Route
            path='pricing'
            element={<HostVanPricing />}
            loader={async () => await protectedRoute()}
          />
          <Route
            path='photos'
            element={<HostVanPhotos />}
            loader={async () => await protectedRoute()}
          />
        </Route>
        <Route
          path='reviews'
          element={<Reviews />}
          loader={async () => await protectedRoute()}
        />
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
