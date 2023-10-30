import styled from "styled-components"
import { mobile } from '../Responsive'
import {Link} from 'react-router-dom'

const Container = styled.div`

flex: 1; 

height: 85vh;


position: relative;
${mobile({ height: '50vh' })}
`
const Image = styled.img`

width: 100%;
height: 100%;
object-fit: cover;
${mobile({ height: '100%' })}
`
const Info = styled.p`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`
const Title = styled.h1`

color: white;
margin-bottom: 28px;

`
const Button = styled.button`
  border: none;
 
  padding: 10px;
  background-color: white;
  color: #252525;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s ease;
  &:hover {
    background-color: teal;
    color: white;
  }
`;





const CategoryItem = ({item}) => {
  return (

    <Link to={`/products/${item.cat}`} > 
    <Container>

     
      
          <Image src={item.img} />
          <Info>
              
              <Title>{item.title}</Title>
              <Button>Shop Now</Button>

          </Info>

    </Container>
    </Link>
  )
}


export default CategoryItem
