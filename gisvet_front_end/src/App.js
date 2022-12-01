//=====Importaciones de React====
import React from "react";

//=====Importaciones de estilos====
import "./App.css";

//=====Importaciones de enrutamiento====
import { Route, Router, Switch } from "wouter";

//=====Importaciones del login====
import login from "./pages/Login/login";

//=====Importaciones del context general====
import { UserContextProvider } from "./context/UserContext/UserContext";

//=====Importaciones de los context de Admin====
import { AdminPatientsContextProvider } from "./context/AdminContext/AdminPatientsContext";
import { AdminUserContextProvider } from "./context/AdminContext/AdminUserContext";
import { AdminDependencyContextProvider } from "./context/AdminContext/AdminDependencyContext";
import { AdminProductsContextProvider } from "./context/AdminContext/AdminProductsContext";

//=====Importaciones de los context de Auditor====
import { AuditorDependencyContextProvider } from "./context/AuditorContext/AuditorDependencyContext";

//=====Importacioens de los componentes del Admin====
import Admin from "./pages/Admin/Admin";
import AdminUser from "./components/AdminComponents/AdminUsers/AdminUsers/AdminUsers";
import AdminProducts from "./components/AdminComponents/AdminProducts/AdminProducts/AdminProducts";
import AdminDependencies from "./components/AdminComponents/AdminDependencies/AdminDependencies/AdminDependencies";
import AdminPatients from "./components/AdminComponents/AdminPatients/AdminPatients/AdminPatients";

//=====Importaciones de los componentes de User====
import User from "pages/User";
import ProductsGrocery from "./components/UserComponents/UserGrocery/ProductsGrocery";

//=====Importaciones de los componentesd de Auditor====
import Auditor from "./pages/Auditor/Auditor";
import AuditorDependencies from "components/AuditorComponents/AuditorDependencies/AuditorDependencies/AuditorDependencies";

//=====Importaciones de las paginas generales====
import Error from "pages/Error/Error";

//=====Importaciones de PrimeReact====
import { StyleClass } from "primereact/styleclass";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
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
              <AuditorDependencyContextProvider>
                <div className="App">
                  <Switch>
                    <Route component={login} path="/" />
                    <Route path="/test">
                      <User>
                        <AdminDependencies />
                      </User>
                    </Route>
                    <Route path="/user">
                      <User></User>
                    </Route>

                    <Route path="/productsbodega">
                      <User>
                        <ProductsGrocery />
                      </User>
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
                    <Route path="/AuditorUser">
                      <Admin>
                        <AdminUser />
                      </Admin>
                    </Route>
                    <Route path="/AuditorDependencies">
                      <Auditor>
                        <AuditorDependencies />
                      </Auditor>
                    </Route>
                    <Route path="/AuditorPatients">
                      <Auditor>
                        <AdminPatients />
                      </Auditor>
                    </Route>
                    <Route path="/AuditorProducts">
                      <Auditor>
                        <AdminProducts />
                      </Auditor>
                    </Route>
                    <Route path="/AuditorReports">
                      <Auditor>
                        <AdminProducts />
                      </Auditor>
                    </Route>
                    <Route component={Error}></Route>
                  </Switch>
                </div>
              </AuditorDependencyContextProvider>
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
