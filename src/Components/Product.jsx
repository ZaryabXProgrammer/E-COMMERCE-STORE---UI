import styled from "styled-components"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from "react-router-dom";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Image = styled.img`
transform: scale(1);
  height: 75%;
  z-index: 2;
  transition: all 0.4s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
align-items: center;
justify-content: center;
  background-color: #d1f2fd8f;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
  &:hover ${Image} {
    transform: scale(1.1);
  }
`;

const Circle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-color: white;
  position:absolute
`;



const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const Product = ({ item }) => {
  return (
    <Container>

      <Circle />
      <Image src={item.img} />

      <Info>

        <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon>

        <Link to={`/product/${item._id}`}>
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
        </Link>

        <Icon>
          <FavoriteBorderIcon />
        </Icon>

      </Info>


    </Container>
  )
}

export default Product
