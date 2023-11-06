import styled from "styled-components"
import Navbar from '../Components/Navbar'
import Announcement from "../Components/Announcement"
import Newsletter from "../Components/Newsletter"
import Products from "../Components/Products";
import Footer from "../Components/Footer"
import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';


const Container = styled.div`
    
`
const Title = styled.h1`
    margin: 21px;
 ${mobile({ margin: '5px 20px' })}

`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
       ${mobile({ margin: '0 20px', display: 'flex', flexDirection: 'column' })}

`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 00;
    margin-right: 20px;
     ${mobile({ marginBottom: '10px' })}
     

`

const Select = styled.select`

padding: 10px;
margin-right: 20px;
  ${mobile({ marginBottom: '10px' })}

`
const Option = styled.option`

`
const TopButton = styled.button`
display: flex;
align-items: center;

  padding: 8px 20px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 20px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


const ProductList = () => {

    const location = useLocation(); //we used this to extract the exact category from the console and then use it in our cat function

    // const cat = (location.pathname.split('/')[2])

    const cat = (location.pathname.split('/')[2])


    //state for color and size filter 
    const [filters, setfilter] = useState([])

    //for sorting based on the ascending and desc price

    const [sort, setsort] = useState("Newest")

    const handleFilters = (e) => {
        const value = e.target.value;

        setfilter({
            ...filters, [e.target.name]: value
        })

        //we are recieving the name from the select then using exisitn filters to add to the object this how we have both color and size filters inside a singgle object, we will use this tp filter next using js filter using object entries that will convert the object to array key and value and then check this property will exciting products array items and then pass the filtered items back.


    }

    const handleBack = () => {

        window.history.back()
    }


    return (
        <Container>
            <Announcement />
            <Navbar />

            <TopButton onClick={handleBack} >
                <ArrowLeftOutlinedIcon /><div>Back</div>
            </TopButton>

            <Title>{cat && cat.toUpperCase()}</Title>

            {cat && 
            <FilterContainer>

                <Filter>
                    <FilterText>Filter Products: </FilterText>
                    {/* COLORS  */}


                    {/* to recognize which select is changing we have to pass name so that onchange could detect which select is actually changing. */}

                    <Select name="color" onChange={handleFilters} >
                        <Option disabled >
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    {/* SIZE SM XL L */}
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled >
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>


                </Filter>

                <Filter>
                    <FilterText>Sort Products: </FilterText>

                    <Select onChange={(e) => setsort(e.target.value)} >
                        <Option value='newest'>Newest</Option>
                        <Option value='asc' >Price (asc)</Option>
                        <Option value='desc'>Price (desc)</Option>
                    </Select>


                </Filter>

            </FilterContainer>}


            <Products cat={cat} filters={filters} sort={sort} />

            <Newsletter />
            <Footer />

        </Container>
    )
}

export default ProductList
