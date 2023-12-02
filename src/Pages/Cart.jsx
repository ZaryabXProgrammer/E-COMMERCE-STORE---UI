import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import { updateProductQuantity } from "../Redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useRef, useState } from "react";
import { userRequest } from "../RequestMethods";
import { useNavigate } from "react-router-dom";


const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "6px" })}
`;
const Title = styled.h1`
  font-weight: 301;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.div`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
 
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  ${mobile({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between" /* Center items horizontally */,
  alignItems: "center" /* Center items vertically */,
  marginTop: "2p",
})}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  ${mobile({
  /* Center items horizontally */
  /* Center items vertically */
  marginTop: "5px",
})}
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
`;
const Hr = styled.hr`
  background-color: #eee;
  height: 1px;
  border: none;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;

  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${props => (props.disabled ? 'gray' : 'black')};
  color: white;
  border: none;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

const Cart = () => {

  //stripe token//

  const KEY = 'pk_test_51Nz1UiBEeHc50nXYMaSsVDquMVYOqReN1jTly2ccYbJ0qeH8Z6cfY9RsMQEhTB5p9Izjya2LO2j4E2D2X3UZwuzO00yp3QF2jI'

  const products = useSelector((state) => state.cart.products); //array
  const quantity = useSelector((state) => state.cart.quantity); //array
  const total = useSelector((state) => state.cart.total.toFixed(2)); //array
  const cart = useSelector((state) => state.cart); //array

  const currentUser = useSelector((state) => state.user.currentUser)

  const [stripetoken, setstripetoken] = useState(null)

  const navigate = useNavigate()

  const OnToken = (token) => {
    setstripetoken(token)
  } //get token from stripe

  useEffect(() => {


    const makeRequest = async () => {

      try {
        await userRequest.post('checkout/payment', {
          tokenId: stripetoken.id,
          amount: total * 100 //100 means 1 dollar in stripe
        }).then((res) => {
          // console.log(res.data); 
          navigate(
            '/success',
            { //using state here is compulsory so that we could use the passed data in another component using useLocation hook
              state: {
                stripeData: res.data,
                cart: cart
              }
            }
          )
        })
      } catch (error) {
        console.log(error)
      }

    }

    stripetoken && makeRequest();

  }, [stripetoken, navigate])


  //using redux here to fetch data coming from the product page using redux state transfer
  // since we can also increase quantity from here we can also use dispatch here in cart;



  // console.log(products)

  //now we will dipatch the quantity from here also

  const dispatch = useDispatch();
  const updateQuantity = (productId, newQuantity) => {
    dispatch(updateProductQuantity({ productId, newQuantity }));
  };

  //using ref

  const checkOutNowButton = useRef()
  //we will use this ref as ref=checkOutNowButton in the original button that has all the fucntionality and then we will use onClick on another button as ()=>checkOutNowButton.current.click()

  const handleBack = () => {

    window.history.go(-2)
  }


  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <Title>Your Bag</Title>

        <Top>

          <TopButton onClick={handleBack}>Continue Shopping </TopButton>


          <TopTexts>
            <TopText>Shopping Bag ( {quantity} )</TopText>
            <TopText>Your Wishlist</TopText>
          </TopTexts>



          {currentUser ? (
            <TopButton type="filled" onClick={() => checkOutNowButton.current.click()}>Checkout Now</TopButton>
          ) : (
            <>

              <TopButton disabled>Checkout Now </TopButton></>
          )}




        </Top>

        <Bottom>

          <Info>
            {products.map((item) => (

              <Product key={item._id}>

                <ProductDetail>
                  <Image src={item.img} />

                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {item.title}
                    </ProductName>
                    <ProductId>
                      <b>Id: </b>
                      {item._id.slice(0, 6)}...
                    </ProductId>
                    <ProductColor color={item.color} />
                    <ProductSize>
                      <b>Size: </b>
                      {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>

                <PriceDetail>

                  {products.map((item) => (
                    <ProductAmountContainer key={item.quantity}>
                      <AddIcon
                        onClick={() => updateQuantity(item._id, item.quantity + 1)} // Increase quantity
                      />
                      <ProductAmount> {item.quantity} </ProductAmount>

                      <RemoveIcon
                        onClick={() => {
                          item.quantity > 1 &&
                            updateQuantity(item._id, item.quantity - 1); // Decrease quantity

                        }}


                      />
                    </ProductAmountContainer>
                  ))}

                  <ProductPrice>${item.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />


          </Info>
          {/* //SUMMARY SECTION */}

          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>

            <SummaryItem>
              <SummaryItemText>Subtotal: </SummaryItemText>
              <SummaryItemPrice>${total} </SummaryItemPrice>

            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping: </SummaryItemText>
              <SummaryItemPrice>$4.90 </SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Shipping Discount </SummaryItemText>
              <SummaryItemPrice>$-4.90</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total: </SummaryItemText>
              <SummaryItemPrice>${total}</SummaryItemPrice>

            </SummaryItem>

            {!currentUser ? (<p>Sign in to checkout</p>
            ) : ''}

            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${total}`}
              amount={total * 100} //only 100 in stripe means 1 dollar
              token={OnToken}
              stripeKey={KEY}
            >


              {currentUser ?
                (
                  <Button ref={checkOutNowButton} >CHECKOUT NOW</Button>)
                :
                (
                  <Button name="disbaledBtn" disabled>CHECKOUT NOW</Button>)
              }

            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container >
  );
};

export default Cart;
