import styled from "styled-components"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import { mobile } from "../Responsive";

const Container = styled.div`
    
display: flex;
  background-color: #000000;
color: white;
${mobile({ flexDirection: 'column' })}

`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;

`

const Logo = styled.h1`

`
const Desc = styled.p`
margin: 20px 0px;
`
const SocialContainer = styled.div`
display: flex;

`
const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: #${props => props.color};
/* background-color: #${props => props.color}; */
`

const Center = styled.div`
 flex: 1;   
 padding: 20px;
 ${mobile({ display: 'none' })}


`

const Title = styled.h3`
margin-bottom: 30px;

`

const List = styled.ul`
margin: 0;
padding: 0; // initally the li has its own built in margin and padding so set 0
list-style: none;
display: flex;
flex-wrap: wrap;
`

const ListItem = styled.li`
width: 50%;
margin-bottom: 10px;
`
const Right = styled.div`
    flex: 1;
   padding: 20px;
   
`


const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;



`

const Payment = styled.img`
     width: 50%;

`





const Footer = () => {
    return (
        <Container>



            <Left>
                <Logo>LAMA.</Logo>
                <Desc>
                    There are many variations of passages of Lorem Ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don’t look even slightly believable.
                </Desc>

                <SocialContainer>
                    <SocialIcon color='1877F2'>
                        <FacebookOutlinedIcon />
                    </SocialIcon>
                    <SocialIcon color='E60023'>
                        <PinterestIcon />
                    </SocialIcon>
                    <SocialIcon color='1DA1F2'>
                        <TwitterIcon />
                    </SocialIcon>
                    <SocialIcon color='bc1888'>
                        <InstagramIcon />
                    </SocialIcon>
                </SocialContainer>
            </Left>


            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>

            <Right>

                <Title>Contact</Title>
                <ContactItem>

                    <RoomIcon style={{marginRight: '10px'}} />
                    622 Dixie Path , South Tobinchester 98336

                </ContactItem>
                <ContactItem>

                    <PhoneIcon style={{ marginRight: '10px' }} />
                   +1 123 456 123

                </ContactItem>
                <ContactItem>

                    <EmailIcon style={{ marginRight: '10px' }} />
                    Contact@zaryab.dev

                </ContactItem>

                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>

        </Container>
    )
}

export default Footer