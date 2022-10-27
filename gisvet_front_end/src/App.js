import React from "react";
import './App.css';
import { Route } from "wouter";
//import login from "./components/Login/login";
import login from "./pages/Login/login";
import { UserContextProvider } from "./context/UserContext";
import adminUser from "./pages/AdminUsers/AdminUsers";
import { AdminUserContextProvider } from "./context/AdminUserContext";
import adminPatients from "./pages/AdminPatients/AdminPatients";

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
            <Route
              component={adminPatients}
              path = "/patients"
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
