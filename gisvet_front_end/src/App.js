import React from "react";
import './App.css';
import { Route } from "wouter";
import login from "./pages/Login/login";
import { UserContextProvider } from "./context/UserContext";
import { AdminPatientsContextProvider } from "./context/AdminPatientsContext";
import AdminUser from "./components/AdminUsers/AdminUsers";
import { AdminUserContextProvider } from "./context/AdminUserContext";
import Admin from "./pages/Admin/Admin"
import AdminDependencies from "./components/AdminDependencies/AdminDependencies";
import AdminPatients from "./components/AdminPatients/AdminPatients";
import { AdminDependencyContextProvider } from "./context/AdminDependencyContext";


const home = React.lazy(()=>import("./pages/Login/login"))

function App() {

  return (
    <UserContextProvider>
      <div className="App">
        <Route 
              component={login}
              path = "/"
         />
        <AdminUserContextProvider>
        <AdminDependencyContextProvider>

            <Route path = "/AdminUser">
              <Admin><AdminUser/></Admin>
            </Route>

            
              <Route path = "/AdminDependencies">
                <Admin><AdminDependencies/></Admin>
              </Route>
           

            <AdminPatientsContextProvider>
                <Route path = "/AdminPatients">
                  <Admin><AdminPatients/></Admin>
                </Route>
            </AdminPatientsContextProvider>      
        </AdminDependencyContextProvider>
        </AdminUserContextProvider>
      </div>   
    </UserContextProvider> 
  );
}

export default App;
