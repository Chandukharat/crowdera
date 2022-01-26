import React from 'react';
import Regis from './Regis'
import Login from './Login'




import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Verify from './Verify';
import All from './All';


function App() {
  
  return (

    <BrowserRouter>
    <div className="App">

   

    <Routes>
    <Route exact path="/" element={<Login />}/>
    <Route exact path="/Regis" element={<Regis />}/>
    <Route exact path="/verify/:id" element={<Verify />}/>
    <Route exact path="/all" element={<All />}/>
    
    

    </Routes>

    
    </div>
    </BrowserRouter>
  );
}

export default App;

