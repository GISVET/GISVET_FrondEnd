//=====Importaciones de React ====
import React, { useEffect, useState, useRef } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableProducts";
import SettingsProducts from "../SettingsGroceryProducts";

//=====Importaciones de componentes de PrimeReact ====
import { Toast } from 'primereact/toast';

//=====Importaciones de hooks ====
import { useProductsDependencie } from "hooks/UserHooks/useProductsDependencie";
import useUser from "hooks/UserHooks/useUser";
import { useGroceryProducts } from "hooks/UserHooks/useGroceryProducts";




export default function ProductsGrocery() {
    const { getDependencieProducts } = useProductsDependencie();
    const { updateProducts, sendTodependencie } = useGroceryProducts()
    const [products, setProducts] = useState([])
    const [sendProducts, setSendProducts] = useState(false)
    const toast = useRef(null);
    const {
        logout,
        islogged,
        role,
        dependencies,
        rolesUser,
        changeRol,
        changeDependencie,
        dependencieActive
    } = useUser()

    useEffect(() => {
        getDependencieProducts(dependencieActive.DEPENDECIE_TYPE, dependencieActive.DEPENDECIE_NAME)
            .then(res => {
                if (res.lenght !== 0) {
                    setProducts(res)
                }
            })
    }, [updateProducts])




    const sendProductsToFarmacy = async(dataToSendProducts) => {
        let productsAux = []
        dataToSendProducts.dataProducts.map(product => {
            const productAux = {
                "id_item": product.ID_ITEM,
                "quantity": product.QUANTITY
            }
            productsAux.push(productAux)
        })
        let result = await sendTodependencie({
            document: dataToSendProducts.document,
            token_tem: dataToSendProducts.token_tem,
            name_dependecie: dataToSendProducts.name_dependecie,
            dataProducts: productsAux
        })

        if (result.status === 200) {
            setSendProducts(false)
            toast.current.show({ severity: 'success', summary: 'Realizado', detail: 'Productos enviados Exitosamente', life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Ha ocurrido un error', detail: 'Valide los datos e intente nuevamente', life: 3000 });
        }
        return result
    }



    const showUserMenu = async(id_dependencie) => {};




    return ( <div className = { styles.general_users } >
        <Toast ref = { toast }/> 
        <Table data = { products }
          keyName = { "id_product" }
          actionItem = { showUserMenu }
          actionSendProducts = { sendProductsToFarmacy }
          sendProducts = { sendProducts } /> 
        <SettingsProducts sendProducts = { sendProducts }
          setSendProducts = { setSendProducts }/> 
        </div>
    );
}