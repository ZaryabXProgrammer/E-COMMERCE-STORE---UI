import styled from "styled-components"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useEffect, useState } from "react";
import { sliderItems } from '../data'
import { mobile } from '../Responsive'
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    
    width: 100%;
    height: 100vh; // 100 vh is used to give the device width for landing page
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: 'none' })}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute; //if using position absolute on the child components then the parent component should have position relative
    top: 0;
    bottom: 0;
    margin: auto; // top 0 bottom 0 margin auto sets the component to the center;
    left: ${props => props.direction === 'left' && '10px'};
    right: ${props => props.direction === 'right' && '10px'};
    cursor: pointer;
    opacity: 0.8;
    z-index: 2;

`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${props => props.slideIndex * -100}vw); // we will use handleclick to set it has -100 for second slide and -200vw for the third slide
    transition: all 1.1s ease;
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};

`
const ImgContainer = styled.div`
height: 100%;
    flex: 1;
`

const Image = styled.img`
height: 80%;

 
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
    
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;

`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    font-weight: bold;
cursor: pointer;
transition: 0.3s ease;
 &:hover {
    background-color: teal;
    color: white;
    
  
  }
`

//if taking function paramter then used anonymouse arrow function isnide onclick event
const Slider = () => {

    const [slideIndex, setslideIndex] = useState(0)


    const handleClick = (direction) => {
        if (direction === 'left') {
            setslideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setslideIndex(slideIndex < 2 ? slideIndex + 1 : 0)

        }
    }

    const navigate = useNavigate()

    const autoSlide = () => {
        // Automatically move the slider to the right after 3 seconds
        handleClick('right');
    };

    // Use useEffect to start the automatic slider after the component mounts
    useEffect(() => {
        const intervalId = setInterval(autoSlide, 5000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [slideIndex]);



  
    return (
        <Container>

            <Arrow direction='left' onClick={() => handleClick("left")}>
                <ArrowLeftOutlinedIcon />
            </Arrow>


            <Wrapper slideIndex={slideIndex}>

                {sliderItems.map((item) => (

                    <Slide bg={item.bg} key={item.id}>

                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>

                        <InfoContainer>

                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button onClick={()=>navigate('/products')}>Shop Now</Button>

                        </InfoContainer>

                    </Slide>
                ))}



                

            </Wrapper>

            <Arrow direction="right" onClick={() => handleClick('right')}>
                <ArrowRightOutlinedIcon />
            </Arrow>


        </Container>
    )
}

export default Slider
