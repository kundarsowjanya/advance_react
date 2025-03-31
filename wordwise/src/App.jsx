import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import { CityProvider } from './contexts/CityContext'
import { FakeAuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import { lazy,Suspense } from 'react'
// import Product from "./pages/Product"
// import Pricing from "./pages/Pricing"
// import HomePage from "./pages/HomePage"
// import PageNotFound from './pages/PageNotFound'
// import AppLayout from './pages/AppLayout'
// import Login from './pages/Login'

const Product=lazy(()=>import("./pages/Product"))
const Pricing=lazy(()=>import("./pages/Pricing"))
const HomePage=lazy(()=>import("./pages/HomePage"))
const PageNotFound=lazy(()=>import("./pages/PageNotFound"))
const AppLayout=lazy(()=>import("./pages/AppLayout"))
const Login=lazy(()=>import("./pages/Login"))

import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'



function App() {



  return (
    <FakeAuthProvider>
    <CityProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage/>}>
     <Routes>
     <Route path="/" element={<HomePage/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
        <Route index element={<Navigate replace to="cities"/>}/>
        <Route path="cities" element={<CityList />}/>
        <Route path="cities/:id" element={<City/>}/>
        <Route path="countries" element={<CountryList />}/>
        <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="login" element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
     </Routes>
     </Suspense>
    </BrowserRouter>
    </CityProvider>
    </FakeAuthProvider>
  )
}

export default App
