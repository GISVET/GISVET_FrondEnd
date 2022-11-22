import React from "react";
import "./App.css";
import { Route, Router, Switch } from "wouter";
import login from "./pages/Login/login";
import { UserContextProvider } from "./context/UserContext";

/** Importaciones para el tipo de usuario - Administrador **/
import { AdminPatientsContextProvider } from "./context/AdminPatientsContext";
import AdminUser from "./components/AdminUsers/AdminUsers";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import { AdminUserContextProvider } from "./context/AdminUserContext";
import Admin from "./pages/Admin/Admin";
import AdminDependencies from "./components/AdminDependencies/AdminDependencies";
import AdminPatients from "./components/AdminPatients/AdminPatients";
import { AdminDependencyContextProvider } from "./context/AdminDependencyContext";
import { AdminProductsContextProvider } from "./context/AdminProductsContext";

/** Importaciones para el tipo de usuario - User **/
import User from "pages/User";
import Error from "pages/Error/Error";

//=====primeReact====
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import { StyleClass } from "primereact/styleclass";
import PrimeReact from "primereact/api";


PrimeReact.ripple = true;
PrimeReact.autoZIndex = true;
PrimeReact.zIndex = {
  modal: 1100, // dialog, sidebar
  overlay: 1000, // dropdown, overlaypanel
  menu: 1000, // overlay menus
  tooltip: 1100, // tooltip
  toast: 1200, // toast
};
PrimeReact.appendTo = "self";
PrimeReact.ripple = true;

const home = React.lazy(() => import("./pages/Login/login"));

function App() {
  return (
    <UserContextProvider>
      <AdminUserContextProvider>
          <AdminDependencyContextProvider>
            <AdminProductsContextProvider>
              <AdminPatientsContextProvider>
      <div className="App">
      <Switch>
        <Route component={login} path="/" />
        <Route path="/user">
          <User></User>
        </Route>
        <Route path="/AdminUser">
          <Admin>
            <AdminUser />
          </Admin>
        </Route>
        <Route path="/AdminDependencies">
          <Admin>
            <AdminDependencies />
          </Admin>
        </Route>
        <Route path="/AdminPatients">
          <Admin>
            <AdminPatients />
          </Admin>
        </Route>
        <Route path="/AdminProducts">
          <Admin>
            <AdminProducts />
          </Admin>
        </Route> 
        <Route component={Error}></Route>
      </Switch>
      </div>
      </AdminPatientsContextProvider>
            </AdminProductsContextProvider>
          </AdminDependencyContextProvider>
      </AdminUserContextProvider>
    </UserContextProvider>
  );
}

export default App;

/*<AdminUserContextProvider>
            <AdminDependencyContextProvider>
              <AdminProductsContextProvider>
                <AdminPatientsContextProvider>
                  <Switch>
                    <Route path="/AdminUser">
                      <Admin>
                        <AdminUser />
                      </Admin>
                    </Route>
                    <Route path="/AdminDependencies">
                      <Admin>
                        <AdminDependencies />
                      </Admin>
                    </Route>
                    <Route path="/AdminPatients">
                      <Admin>
                        <AdminPatients />
                      </Admin>
                    </Route>
                    <Route path="/AdminProducts">
                      <Admin>
                        <AdminProducts />
                      </Admin>
                    </Route>
                    <Route><Error></Error></Route>
                  </Switch>
                </AdminPatientsContextProvider>
              </AdminProductsContextProvider>
            </AdminDependencyContextProvider>
          </AdminUserContextProvider>
    */
