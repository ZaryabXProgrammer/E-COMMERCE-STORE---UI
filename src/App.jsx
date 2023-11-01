import Home from "./Pages/Home"
import ProductList from "./Pages/ProductList"
import Product from "./Pages/Product"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Cart from "./Pages/Cart"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Success from "./Pages/Success"
// import Products from "./Components/Products"
// import { useSelector } from "react-redux"


// import Cart from "./Pages/Cart"

const App = () => {

  // const currentUser = useSelector(state => state.user.currentUser.username)
  // // console.log(currentUser)

  return (
    <div>

      <Router>

        <Routes>


          <Route path="/" exact element={<Home />} />

          <Route path="/products/:category" exact element={<ProductList />} /> 

          <Route path="/products" exact element={<ProductList/>} />

          <Route path="/product/:id" exact element={<Product />} />

          <Route path="/cart" exact element={<Cart />} />
{/* 
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} /> */}

          <Route path="/login" element={<Login />} />
           
          
{/* 
          <Route path="/register" exact element={currentUser ? <Navigate to='/'/> :
            <Register />} /> */}
          <Route path="/register" exact element={<Register />} />
          
          <Route path="/success" exact element={<Success />} />
          


        </Routes>






      </Router>










    </div>
  )
}

export default App
