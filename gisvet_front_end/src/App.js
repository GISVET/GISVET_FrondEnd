import React from "react";
import './App.css';
import { Route } from "wouter";
//import login from "./components/Login/login";
import login from "./pages/Login/login";
import { userContextProvider } from "./context/UserContext";
import Header from "./components/Header/header"


function App() {

  return (
    <userContextProvider>
    <div className="App">
        <div className="general">
          <Route 
            component={login}
            path = "/"
          />
          <Route
            component={adminUser}
            path = "/admin"
          />
      </div>
    </div>   
    </userContextProvider> 
  );
}

export default App;
