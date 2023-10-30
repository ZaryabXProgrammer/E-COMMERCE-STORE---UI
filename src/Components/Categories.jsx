import styled from "styled-components"

import { categories } from '../data'
import CategoryItem from "./CategoryItem"
import {mobile} from '../Responsive'

const Container = styled.div`
display: flex;
padding: 1px;
width: 100%;
justify-content: space-evenly;
${mobile({ padding: '0px', flexDirection: 'column' })} 



`


const Categories = () => {
  return (
      <Container>

          {categories.map((item) => (
              <CategoryItem item={item} key={item.id} />
          ))}

      </Container>
  )
}

export default Categories
