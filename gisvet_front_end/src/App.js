import React from "react";
import './App.css';
import { Route } from "wouter";
//import login from "./components/Login/login";
import login from "./pages/Login/login";
import { UserContextProvider } from "./context/UserContext";
import adminUser from "./pages/AdminUsers/AdminUsers";

const home = React.lazy(()=>import("./pages/Login/login"))

function App() {

  return (
    <UserContextProvider>
      
      <div className="App">
            <Route
              component={adminUser}
              path = "/admin"
            />
            <Route 
              component={login}
              path = "/"
            />
      </div>   
    </UserContextProvider> 
  );
}

export default App;
