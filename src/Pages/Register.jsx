import styled from "styled-components"
import { mobile } from "../Responsive"
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { publicRequest } from "../RequestMethods"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
width: 100vw; // full screen component
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.2)),
url('https://i.ibb.co/Y7MbN56/payment-4334491.jpg') ;
background-size: cover;

display: flex;
justify-content: center;
align-items: center;



`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
       ${mobile({ width: '80%' })}


`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  
`
const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
`;

const Input = styled(Field)`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement = styled.div`
    font-size: 12px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover{
        background-color: white;
        color: teal;
        border: 1px solid teal;
        font-weight: bold;
    }
`


const Register = () => {



    const initialValues = {


        username: "",
        email: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4).max(20).required(),
        email: Yup.string().required(),
        password: Yup.string().min(4).max(16).required()
    })


    const navigate = useNavigate()

    const onSubmit = async (data) => {

        try {

            await publicRequest.post('auth/register', data).then((res) => {
                alert(res.data.username + ' Registered')
                navigate('/')
            })


        } catch (error) {
            console.log(error)
        }

    }



    return (


        <Container>


            <Wrapper>

                <Title>Register </Title>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

                    <Form>

                        <ErrorMessage name='username' component="span" style={{ color: 'red', marginTop: '11px' }} />

                        <Input name="username" placeholder='Username' />

                        <ErrorMessage name="password" component="span" style={{ color: 'red', marginTop: '11px' }} />

                        <Input name="password" placeholder='Password' type='password' />

                        <ErrorMessage name="email" component="span" style={{ color: 'red', marginTop: '11px' }} />
                        <Input name="email" placeholder='Email' />

                        <Agreement>
                            By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>PRIVACY POLICY.</b>
                        </Agreement>
                        <Button type="submit">CREATE</Button>
                    </Form>
                </Formik>

            </Wrapper>



        </Container>
    )
}

export default Register
