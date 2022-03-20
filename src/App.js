import React from 'react'
import Axios  from 'axios';
import './App.css';
import Recipetile from "./Recipetile";
import {useState} from 'react';



function App() {

 const YOUR_APP_ID="6fe7c0b0";
 const YOUR_APP_KEY="4a4643517b0973ae10c5ce81641fd2cd";
  

  const [query, setQuery] = useState("");
  const [healthLabel, setHealthLabel] = useState("vegetarian");
  const [recipes, setRecipes] = useState([]);

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;


  const getRecipeInfo=async()=>{
    var result=await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  };
  
  
  const onSubmit= (e) => {
    e.preventDefault(); //this will prevent page from reloading
    getRecipeInfo();
  };
  
  
  return (
    <div className="app">
      
      <h1 onClick={getRecipeInfo}>HEY Foody FOLKS!🥗</h1>
    <form className="app__searchform" onSubmit={onSubmit}>
  
       <input
              type="text"
             placeholder="Enter Ingredients"
              autoComplete="Off"
            class="app_input"
              value={query}
            onChange={(e) => {setQuery(e.target.value)
            
            }}/>

     <select className="app__healthLabels">
     <option
            value="vegan"
            onClick={() => {
              setHealthLabel("vegan");
            }}
          >
            vegan
          </option>
          <option
            value="vegetarian"
            onClick={() => {
              setHealthLabel("vegetarian");
            }}
          >
            vegetarian
          </option>
          <option
            value="low-sugar"
            onClick={() => {
              setHealthLabel("low-sugar");
            }}
          >
            low-sugar
          </option>
          <option
            value="dairy-free"
            onClick={() => {
              setHealthLabel("dairy-free");
            }}
          >
            dairy-free
          </option>
          <option
            value=" immuno-supportive "
            onClick={() => {
              setHealthLabel(" immuno-supportive ");
            }}
          >
            immuno-supportive
          </option>
          <option
            value="wheat-free"
            onClick={() => {
              setHealthLabel("wheat-free");
            }}
          >
            wheat-free
          </option>
    </select>
 
 <input class="app__submit" type="submit" value="Get Recipe"></input>
    </form>
    <div className="app__recipes">       
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <Recipetile recipe={recipe} />;
          })}
          </div>
    </div>
  );
}

export default App;
