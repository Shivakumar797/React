import { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {

    const [recipe,setRecipe]=useState([]);
    const [activeTab,setActiveTab]=useState("instructions");
    let params=useParams();
    const getRecipe=async (recipeId)=>{
        const data=await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=be61dd7357d640e49c97910ce8f22229&includeNutrition=true`)
        const detailedata= await data.json()
        setRecipe(detailedata)
    }

    useEffect(()=>{
        getRecipe(params.recipeId)
      },[params.recipeId]) 

    return (
<DetailWapper>
  <Firstdiv>
  <h4>{recipe.title}</h4>
  <img src={recipe.image} alt=""/>
  </Firstdiv>
  <div>
  <Info>
  <Button className={activeTab==='instructions' ? "active":""} onClick={()=>setActiveTab('instructions')}>
    Instructions
    </Button>
  <Button className={activeTab==='ingredients' ? "active":""} onClick={()=>setActiveTab('ingredients')}>
    Ingredients
    </Button>
  </Info>
  {activeTab==='instructions' &&(
    <div>
    <H3content dangerouslySetInnerHTML={{__html:recipe.summary}}></H3content>
    <H3content dangerouslySetInnerHTML={{__html:recipe.instructions}}></H3content>
  </div>

  )}
  {activeTab==='ingredients' &&(
   <ul>
    {recipe.extendedIngredients.map((ingredient)=>{
      return <H3content dangerouslySetInnerHTML={{__html:ingredient.original}}></H3content>
    })}
   </ul>

  )}
  
  </div>
  
    </DetailWapper>
  )
}



const DetailWapper=styled.div`
display:flex;
  margin-top:2rem;
  /* margin-bottom:10rem; */
  .active{
    background:linear-gradient(to right,#f27121,#e94057);
    color:#fff;
  }
  h2{
    margin-bottom:2rem;
  }
  li{
    font-size:1.2rem;
    line-height:2.5rem
  }
  ul{
    margin-top:2rem;
  }
  img{
  border-radius:1rem;
  height:15rem;
  width:15rem;
  padding-left:0rem;
}
div{
}
`;


const Button=styled.button`
  padding:0rem 1rem;
  color: #313131;
  background:white;
  border:1px solid black;
  margin-right:1rem;
  font-weight:600;
  height:3rem;
`;
const Info=styled.div`
display:flex;
margin-left:10rem;
padding-right:0rem;
`;

const H3content=styled.h3`
margin-left:10rem;
`;


const Firstdiv=styled.div`
width:15%;
margin-left:0rem;
`;


export default Recipe
