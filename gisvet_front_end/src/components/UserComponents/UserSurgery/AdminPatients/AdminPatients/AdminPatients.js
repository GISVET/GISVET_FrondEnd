//=====Importaciones de React====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos====
import styles from "./styles.module.css";

//=====Importaciones de imagenes====
import icon_Filter from "./images/Icon_Filter.png";

//=====Importaciones de componentes PrimeReact====
import { Modal } from "components/GeneralComponents/Modal";

//=====Importaciones de componentes generales====
import Table from "../TablePatients/TablePatients";
import TableProducts from "../TableProducts"
import SettingsAdminPatients from "../SettingsAdminPatients";
import ShowPatient from "../ShowPatient/ShowPatient";

//=====Importaciones de hooks ====
import { useAdminPatients } from "hooks/AdminHooks/PatientsHooks/useAdminPatients";
import useUser from "hooks/UserHooks/useUser";
import { useGroceryProducts } from "hooks/UserHooks/useGroceryProducts";
import assignProductsToPatient from "services/UserServices/ProductsServices/createTracingProducts";

//=====Importaciones de constantes ====
import { useProductsDependencie } from "hooks/UserHooks/useProductsDependencie";
import { filterPatients } from "constants/constants";
import { setIn } from "formik";

export default function AdminPatients() {
  const { getDependencieProducts } = useProductsDependencie();
  const { patients, headers } = useAdminPatients();
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);
  const [showProducts, setShowProducts] = useState(false);
  const { updateProducts, sendTodependencie } = useGroceryProducts()
  const [products, setProducts] = useState([])
  const [patient, setPatient] = useState()
  const {jwt,dependencieActive} = useUser()

  useEffect(() => {
    getDependencieProducts(dependencieActive.DEPENDECIE_TYPE, dependencieActive.DEPENDECIE_NAME)
        .then(res => {
            if (res.lenght !== 0) {
                setProducts(res)
            }
        })
}, [updateProducts, dependencieActive])

  const showPatientMenu = async (data) => {
    setShowModal(true);
    setchildModal(
      <ShowPatient
        dataPatient={data}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
      />
    );
  };

  const applyProductsToPatient = async(productsToApply) => {
    let productsAux = []
    productsToApply.products.map(product => {
        const productAux = {
            "id_item": parseInt(product.ID_ITEM),
            "quantity_used": parseInt(product.QUANTITY),
            "unit_measurement":product.MEASUREMENT_UNITS
        }
        productsAux.push(productAux)
    })
    productsToApply.products=productsAux
    let result = await assignProductsToPatient({jwt,data:productsToApply})
    setShowProducts(result.status !== 200)
    setShowModal(true);
    return result
}

  const applyProducts= (data)=>{
    setPatient(data)
    setShowProducts(true)
  }


  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.general_users}>
        {showProducts && patient!== undefined?
          <TableProducts data = { products }
          patient={patient}
          keyName = { "id_product" }
          actionApplyProducts = {applyProductsToPatient }
           /> 
        :<Table
          headers={headers}
          data={patients}
          keyName={"id_clinic_history"}
          actionItem={showPatientMenu}
          applyProducts = { applyProducts }
        />}
      </div>
      {showModal && 
        <Modal
          onClose={handleCloseModal}
          >
          {childModal}
        </Modal>
      }{" "}
    </>
  );
}
