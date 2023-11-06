import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../RequestMethods"; //contains all the axios create request for admin and normal public
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 100%;
  height: 60vh; //take 60% of the total area of the screen
  object-fit: contain;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.div`
  margin: 20px;
`;
const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 20px 0px;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  border: ${(props) => props.isSelected && "3px solid teal"};
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
`;

const Product = () => {
  const location = useLocation(); //we will use this to retrieve the id paramter from the url by splitting url and then taking second index

  const id = location.pathname.split("/")[2];

  const [product, setproduct] = useState({}); //coming from api

  const [quantity, setquantity] = useState(1); //set counter

  const [color, setcolor] = useState(null); //choose particualr color from color array

  // const [initialSize, setinitialSize] = useState(null);

  const [size, setsize] = useState(null);
  //making a circular border around color to imply the selection, make state to hold selected color property.

  useEffect(() => {
    const getProduct = async () => {
      try {
        await publicRequest.get(`products/find/${id}`).then((res) => {
          setproduct(res.data);
          setsize(res.data.size[0])
          setcolor(res.data.color[0])
        });
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);


  // useEffect(() => {
  //   setsize(initialSize)


  // }, [initialSize])

  //using useSelector for default values and dispath for action update

  const dispatch = useDispatch()

  const addToCart = () => {

    // const price = product.price * quantity

    dispatch(
      addProduct({ ...product, quantity, color, size })
    )
    //we sending all the product items but setting the quanity color and size which we have selected, means updating existing data

    //after es6 js we can do product directly instead of product: product if the parent and child have same key names
  }

  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>

          <FilterContainer>
            
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={c}
                  onClick={() => {
                    setcolor(c);
                  }}
                  isSelected={c === color}
                />
                //in database the color is an array thats why mapped through it
              ))}
              {/*                             
                            <FilterColor color='darkblue' />
                            <FilterColor color='gray' /> */}
            </Filter>

            <Filter>

              <FilterTitle>Size</FilterTitle>

              <FilterSize onChange={(e) => setsize(e.target.value)}>

                {product.size?.map((size) => (

                  <FilterSizeOption key={size} value={size}>{size}</FilterSizeOption>

                ))}

              </FilterSize>

            </Filter>

          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <RemoveIcon
                onClick={() =>
                  setquantity((prev) => (prev > 1 ? prev - 1 : prev))
                }
              />

              <Amount>{quantity}</Amount>

              <AddIcon onClick={() => setquantity((prev) => prev + 1)} />
              
            </AmountContainer>

            <Button onClick={addToCart} >

              Add To Cart
              {/* <FilterColor color={color} /> */}
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
