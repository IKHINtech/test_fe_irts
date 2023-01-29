import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/Header';
import HomeScreen from './screens/HomeScreen'
import { Container, Box } from '@mui/material'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'



import ProductEditScreen from './screens/ProductEditScreen'




import { BrowserRouter, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Container fixed>
          <Routes>
            <Route
              path='/*'
              element={<HomeScreen />}
              exact
            />

            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
              exact
            />

            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />

            <Route
              path='/admin/productlist'
              element={<ProductListScreen />}
              exact />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListScreen />}
              exact />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />







          </Routes>
        </Container>
      </BrowserRouter>

    </div>
  );
}

export default App;
