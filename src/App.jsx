import './App.css';
import Pages from "./pages/pages";
import Category from './components/category';
import {BrowserRouter} from 'react-router-dom';
import Search from './components/search';

function App() {

return(
<div className="main">
  <BrowserRouter>
  <Search/>
  <Category/>
  <Pages/>  
  </BrowserRouter>  </div>
  );

}

export default App;
