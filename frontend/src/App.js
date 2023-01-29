import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/Header';
import HomeScreen from './screens/HomeScreen'
import { Container, Box } from '@mui/material'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import DialogCreateProduct from './screens/DialogCreateProject'
import UserListScreen from './screens/UserListScreen';



import ProductEditScreen from './screens/ProductEditScreen'




import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserEditScreen from './screens/UserEditScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderDerailPage';
import ProfileScreen from './screens/ProfileScreen';
import LandingScreen from './screens/LandingScreen';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Container fixed>
          <Routes>
            <Route path='/*' element={<HomeScreen />} exact />
            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} exact />
            <Route path='/admin/product/add' element={<DialogCreateProduct />} exact />
            <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} exact />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/orders' element={<OrderListScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/landing' element={<LandingScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />


          </Routes>
        </Container>
      </BrowserRouter>

    </div>
  );
}

export default App;
