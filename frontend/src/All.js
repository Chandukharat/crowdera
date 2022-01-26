import React from "react";




function All() {
  var Link = require('react-router-dom').Link


  
  
  const username = localStorage.getItem("author");
  const Up = username.toUpperCase()
  const file = localStorage.getItem("file");

  
  


  





  return (<div>
    <div class="container">

      <div className='head' > <h1 class="display-1">WELCOME {Up}</h1> <img src={`http://localhost:8001/uploads/${file}`}></img>  </div>
      
      

  </div>
  </div>)
}

export default All;