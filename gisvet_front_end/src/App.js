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

            <Route path = "/AdminUser">
              <Admin><AdminUser/></Admin>
            </Route>

            <AdminDependencyContextProvider>
              <Route path = "/AdminDependencies">
                <Admin><AdminDependencies/></Admin>
              </Route>
            </AdminDependencyContextProvider>


            <AdminPatientsContextProvider>
                <Route path = "/AdminPatients">
                  <Admin><AdminPatients/></Admin>
                </Route> 
            </AdminPatientsContextProvider>      

        </AdminUserContextProvider>
      </div>   
    </UserContextProvider> 
  );
}

export default App;
