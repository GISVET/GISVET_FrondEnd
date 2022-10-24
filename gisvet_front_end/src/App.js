import React from "react";
import './App.css';
import { Route } from "wouter";
//import login from "./components/Login/login";
import login from "./pages/Login/login";
import { UserContextProvider } from "./context/UserContext";
import adminUser from "./pages/AdminUsers/AdminUsers";
import { AdminUserContextProvider } from "./context/AdminUserContext";

const home = React.lazy(()=>import("./pages/Login/login"))

function App() {

  return (
    <UserContextProvider>
      <div className="App">
        <AdminUserContextProvider>
            <Route
              component={adminUser}
              path = "/admin"
            />
        </AdminUserContextProvider>
            <Route 
              component={login}
              path = "/"
            />
      </div>   
    </UserContextProvider> 
  );
}

export default App;
