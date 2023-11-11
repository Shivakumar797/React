import React from 'react';
import Home from './home';
import Searched from './searched';
import Recipe from './recipe';
import Cuisine from './cuisine';

import { Route, Routes } from 'react-router-dom';

export default function Pages() {
  return (
    <Routes>
      <Route  exact path="/" element={<Home />} />
      <Route exact path="cuisine/:type" element={<Cuisine />} />
      <Route exact path="recipe/:recipeId" element={<Recipe />} />
      <Route exact path="searched/:search" element={<Searched />} />
    </Routes>
  );
}
