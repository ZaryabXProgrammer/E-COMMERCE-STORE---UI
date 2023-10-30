import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { userRequest } from "../RequestMethods";
import { useDispatch, useSelector } from "react-redux";
import { removeProducts } from "../Redux/cartRedux";


const Success = () => {

  const [orderID, setorderID] = useState('')

  const location = useLocation()

  const id = useSelector(state=>state.user.currentUser._id)
  const username = useSelector(state=>state.user.currentUser.username)
  const accessToken = useSelector(state => state.user.currentUser.accessToken)
  console.log(accessToken)

  const data = location.state.stripeData;
  const cart = location.state.cart;

  const dispatch = useDispatch()


  // console.log(data)
  // console.log(cart)


  useEffect(() => {

    const makeOrder = async () => {

      try {

        await userRequest.post(`orders/${id}`, {
          userId: id,

          username: username,
         
          products: cart.products.map((item) => (
            {
              productId: item._id,
              quantity: item.quantity
            }
          )),
          amount: cart.total,
          address: data.billing_details.address.line1

        }, {
          headers: {
            token: accessToken
          }
        }
        
        ).then((res) => setorderID(res.data._id)).then(() => dispatch(removeProducts()))
        

      } catch (error) {
        console.log(error)
      }

    }

    data && makeOrder();


  }, [cart, data])


  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/')
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderID
        ? `Order has been created successfully. Your order number is ${orderID}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20, backgroundColor: 'teal', color: 'white'}} onClick={handleClick}> Go to Homepage</button>
    </div>
  )
}

export default Success
