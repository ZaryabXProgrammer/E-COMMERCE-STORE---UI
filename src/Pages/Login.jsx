import styled from "styled-components"
import { mobile } from "../Responsive"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginFailture, loginStart, loginSuccess } from "../Redux/userSlice"
import { publicRequest } from '../RequestMethods'

import { addCartProduct } from "../Redux/cartRedux"
import { useNavigate } from "react-router-dom"



const Container = styled.div`
width: 100vw; // full screen component
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.2)),
url('https://i.ibb.co/Tc6Qjqh/cyber-monday-5463567-1280.jpg') center ;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;

`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: '80%' })}

`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`
const Link = styled.a`
    
    margin: 5px 0;

font-size: 12px;
text-decoration: underline;
cursor: pointer;
`

const Login = () => {


    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userId = useSelector((state) => (state.user.currentUser ? state.user.currentUser._id : null));

    const accessToken = useSelector((state) => (state.user.currentUser ? state.user.currentUser.accessToken : null));

    console.log(userId)

    //fetching users previos cart data back in place
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await publicRequest.post('auth/login', { username, password });
            dispatch(loginSuccess(response.data));

            if (userId) {
                const cartResponse = await publicRequest.get(`cart/find/${userId}`, {
                    headers: {
                        token: accessToken
                    }
                });

                // Check if cartResponse exists and has data
                if (cartResponse && cartResponse.data) {
                    const payload = {
                        quantity: cartResponse.data.quantity || 0,
                        products: cartResponse.data.products || [],
                        total: cartResponse.data.total || 0,
                    };

                    navigate('/')

                    setTimeout(() => {
                        dispatch(addCartProduct(payload));
                    }, 2);
                } else {
                    // Handle the case when cartResponse is empty or missing data
                    // Set payload to initial/default values
                    const payload = {
                        quantity: 0,
                        products: [],
                        total: 0,
                    };
                    window.history.back();
                    setTimeout(() => {
                        dispatch(addCartProduct(payload));
                      
                    }, 2);

                    dispatch(loginFailture());
                }
            }
        } catch (error) {
            dispatch(loginFailture());
            console.log(error);
        }
    };


    return (

        <Container>


            <Wrapper>

                <Title>Sign In </Title>

                <Form>
                    <Input placeholder='Username' onChange={(e) => setusername(e.target.value)} />
                    <Input placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
                    <Button onClick={handleLogin} >Login</Button>
                    <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>



        </Container>
    )
}

export default Login
