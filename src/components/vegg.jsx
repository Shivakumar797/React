import { useEffect, useState } from "react";
import styled from 'styled-components'
import {Splide,SplideSlide} from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";



function  Vegg(){
    const [vegg,setVegg]=useState([]);

    useEffect(()=>{
        getPopular();
    },[])    
    const getPopular=async()=>{

      const check=localStorage.getItem('vegg');
      if(check){
        setVegg(JSON.parse(check));
      }else{
        const api=await fetch(`https://api.spoonacular.com/recipes/random?apiKey=be61dd7357d640e49c97910ce8f22229&includeNutrition=true&number=10`)
        const data=await api.json()
        console.log("mainpagemainpage",data);
        localStorage.setItem("vegg",JSON.stringify(data.recipes))

        setVegg(data.recipes)

      }

        
    }
    
     return (
      <div>
     <Wrapper>
        <h1>VEGG</h1>
        <Splide options={{
          perPage:3,arrows:false,pagination:false,drag:'free',gap:'2rem'
          }}>
            {
              vegg.map((recipe) =>{  
                return (
                    <SplideSlide key={recipe.id} >
                      <RecipeItem key={recipe.id}>
                        <Link to={'recipe/'+recipe.id}>
                        <p>{ recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient />
                        </Link>
                      </RecipeItem>
                    </SplideSlide>
                )
              })
            }
          </Splide>
      </Wrapper></div>
    )

}



















const Wrapper = styled.div`
margin:4rem 0rem;
`;

const RecipeItem = styled.div`
min-height:25rem;
border-radius:2rem;
overflow:hidden;
position:relative; 
img{
  border-radius:2rem;
  position:absolute;
  left:0;
  width:100%;
  height:100%;
  object-fit:cover;
  
}
p{
  position:absolute;
  z-index:10;
  left:50%;
  bottom:0%;
  transform:translate(-50%,0%);
  color:white;
  width:100%;
  text-align:center;
  font-weight:600;
  font-size:1rem;
  height:40%;
  display:flex;
  justify-content:center;
  align-items:center;

}
`
const Gradient=styled.div`
z-index:3;
position:absolute;
width:100%;
height:100%;
background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5))

`

export default Vegg