import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../Responsive'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../Redux/userSlice";
import { removeProducts } from "../Redux/cartRedux";

import { publicRequest } from "../RequestMethods";



const Container = styled.div`
height: 60px;
${mobile({ height: '50px' })}    

`

const Wrapper = styled.div`

    padding: 10px  20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: '10px 0px' })}  

`
//LEFT SIDE OF NAV
const Left = styled.div`
 
    flex: 2 ;
    display: flex;
    align-items: center;

`

const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({ display: 'none' })} 
`

const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ padding: '1px' })} 
`

const Input = styled.input`
border: none;
${mobile({ width: '50px' })} 
`

//CENTER NAV
const Center = styled.div`
    flex: 1 ;
    text-align: center;
`

const Logo = styled.h1`
    cursor: pointer;
    font-weight :bold ;
    ${mobile({ fontSize: '24px' })} 
    ${mobile({ marginLeft: '30px' })} 
    

`

//RIGHT NAV
const Right = styled.div`
    flex: 2 ;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ justifyContent: 'center', marginRight: '10px'})}

`

const StyledLink = styled(Link)`
  color: black; // Remove the quotes around "black"
  text-decoration: none; // Remove the quotes around "none"
  transition: color 0.3s ease;
  font-weight: 590;

  &:hover {
    color: teal;
    
  }
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })} 
`


const Navbar = () => {

    const dispatch = useDispatch()

    const quantity = useSelector((state) => state.cart.quantity);

    const total = useSelector((state) => state.cart.total);

    const currentUser = useSelector((state) => state.user.currentUser)

    const products = useSelector((state) => state.cart.products)

    const cartData = {
        userId: currentUser ? currentUser._id : null,
        quantity: quantity,
        total: total,
        products: products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            title: item.title,
            desc: item.desc,
            img: item.img,
            categories: item.categories,
            price: item.price,
        })),
    };

    const id = currentUser ? currentUser._id : null;


    // console.log(currentUser)
    const saveCart = async () => {
        try {
            // Fetch the user's cart
            const existingCart = await publicRequest.get(`cart/find/${id}`, {
                headers: {
                    token: currentUser.accessToken
                }
            });

            if (existingCart.data && existingCart.status === 200) {
                // If a cart exists, update it with a PUT request
                const updatedCart = await publicRequest.put(`cart/${id}`, cartData, {
                    headers: {
                        token: currentUser.accessToken
                    }
                }
                );
                console.log(updatedCart.data);
            } else {
                try {
                    // If no cart exists or the update failed, create a new cart with a POST request
                    const newCart = await publicRequest.post("cart", cartData, {
                        headers: {
                            token: currentUser.accessToken
                        }
                    }
                    );
                    console.log(newCart.data);
                } catch (createError) {
                    // Handle create error, if necessary
                    console.log(createError);
                }

            }
        } catch (updateError) {
            // Handle update error, if necessary
            console.log(updateError)

        }

    }


    const handleSignOut = async () => {
        try {
            // First, save the user's cart data to the API
            await saveCart();

            // Dispatch an action to remove products from the Redux store
            await dispatch(removeProducts());

            // Dispatch an action to sign the user out
            await dispatch(signOut());

            // Navigate to the desired location (e.g., the home page) after all asynchronous tasks have completed
            navigate('/');

        } catch (error) {
            console.log("Error during sign-out:", error);
        }
    };


    const navigate = useNavigate()

    return (

        <Container>

            <Wrapper>

                <Left>

                    <Language>EN</Language>

                    <SearchContainer>
                        <Input placeholder="search" />
                        <SearchIcon style={{ color: "grey", fontSize: '16px' }} />
                    </SearchContainer>

                </Left>

                <Center>
                    <Logo onClick={() => navigate('/')}>LAMA.</Logo>
                </Center>

                <Right>
                    {/* {currentUser && <><h3>@{currentUser.username}</h3></>} */}



                    {currentUser ? (
                        <>
                            <Link style={{ color: "black", textDecoration: "none" }}>
                                <MenuItem>@{currentUser.username}</MenuItem>
                            </Link>
                            <StyledLink onClick={handleSignOut}>
                                <MenuItem>Sign Out</MenuItem>
                            </StyledLink>

                        </>
                    ) : (
                        <>
                            <StyledLink to='/register' >
                                <MenuItem>Register</MenuItem></StyledLink>
                            <StyledLink to="/login" >
                                <MenuItem>Sign In</MenuItem>
                            </StyledLink>
                        </>
                    )}



                    <MenuItem>

                        <Link to='/cart' style={{ color: 'black' }} >
                            <Badge badgeContent={quantity} color="primary">

                                <ShoppingCartOutlinedIcon />

                            </Badge>
                        </Link>

                    </MenuItem>
                </Right>

            </Wrapper>

        </Container>
    )
}

export default Navbar
