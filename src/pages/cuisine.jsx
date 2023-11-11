import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'; // Import useNavigate
import '@splidejs/splide/dist/css/splide.min.css';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const { type } = useParams(); // Destructure 'type' from params

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=be61dd7357d640e49c97910ce8f22229&includeNutrition=true&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

 

  useEffect(() => {
    getCuisine(type); // Use the 'type' from params
  }, [type]);

  return (
    <Grid>
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link  to={`/recipe/`+item.id}>
              <img src={item.image} alt={item.title}  />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
