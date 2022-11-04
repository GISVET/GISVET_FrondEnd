import React, { useContext,useEffect, useState } from "react";
import styles from './styles.module.css';
import adminProductsContext from "../../context/AdminProductsContext";
import icon_User_Form from "./images/Icon_Add_User_Form.png"
import { typeDoc } from "../../constants/constants";
import { useAdminDependencies } from "../../hooks/useAdminDependencies";
import { presentations } from "../../constants/constants";


export default function AddItemProduct({onSubmit, onClose}){
    const {
        products,
        brands,
        features,
        loading,
        setLoading,
      } = useContext(adminProductsContext);


      const {
        dependencies,
        headers,
        askDependencyType,
      } = useAdminDependencies();

    const [errorMessage, setErrorMessage] = useState('')
    const typeDocuments = typeDoc
    const [classPassword, setClassPassword] = useState('')
    const [dataReady, setDataReady] = useState(false)

    const [data, setData] = useState({
        presentation:'',
        quantity:'',
        id_product:'',
        id_feature:'', 
        id_dependencie:'',
        id_brand:''
    });

    useEffect(()=>{
        if(products != undefined && brands != undefined && features!=undefined){
            if (dependencies.length >0) {
                setDataReady(true)
            }
            console.log(products)
            console.log(dependencies)
        }
        
    },[loading])

    const doSubmit = (event)=>{
        event.preventDefault();
        console.log(data)
        onSubmit(data)
    }

    const handleChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
    }

    return (
            <div className={styles.form_add_item_general}>
                {dataReady && <>
                <div className={styles.title_image}> 
                    <img src={icon_User_Form} width="40" height="40"/>
                    <h1> Registro de productos por lote</h1>
                </div>
                <form className={styles.form_add_user}
                     onSubmit={doSubmit}>

                    <label htmlFor="quantity">
                        Cantidad de producto a registrar
                    </label>
                    <input name="quantity" 
                            onChange={handleChange}  
                            required={true} 
                            type="number" 
                            placeholder="Inserte la cantidad a agregar"/>


                    <label htmlFor="id_product">
                        Producto a registrar
                    </label>
                    <select onChange={handleChange} 
                            required={true} 
                            name="id_product" >

                        <option disabled={true} selected></option>
                        {products.map(product=>
                            <option  key={product.id_product} value={product.id_product}>
                                {product.product_name}
                            </option>
                            )
                        }
                    </select>

                    <label htmlFor="id_brand">
                        Marca del producto
                    </label>
                    <select onChange={handleChange} 
                            required={true} 
                            name="id_brand" >

                        <option disabled={true} selected></option>
                        { brands.map(brand=>
                            <option  key={brand.ID_BRAND} value={brand.ID_BRAND}>
                                {brand.NAME_BRAND}
                            </option>
                            )
                        }
                    </select>


                    <label htmlFor="presentation">
                        Presentacion a agregar
                    </label>
                    <select onChange={handleChange} 
                            required={true} 
                            name="presentation" >

                        <option disabled={true} selected></option>
                        { presentations.map(presentation=>
                            <option  key={presentation.id} value={presentation.id}>
                                {presentation.name}
                            </option>
                            )
                        }
                    </select>

                    <label htmlFor="id_feature">
                        Lote al que pertenece
                    </label>
                    <select onChange={handleChange} 
                            required={true} 
                            name="id_feature" >

                        <option disabled={true} selected></option>
                        { features.map(feature=>
                            <option  key={feature.ID_FEATURE} value={feature.ID_FEATURE}>
                                {'Registro  '+ feature.INVIMA}
                            </option>
                            )
                        }
                    </select>


                    <label htmlFor="id_dependencie">
                        Dependencia a asignar
                    </label>
                    <select onChange={handleChange} 
                            required={true} 
                            name="id_dependencie" >

                        <option disabled={true} selected></option>
                        { dependencies.map(dependencie=>
                            dependencie.type_dependencie == "Bodega" &&
                            <option  key={dependencie.id_dependencie} value={dependencie.id_dependencie}>
                                {dependencie.dependencie_name}
                            </option>
                            )
                        }
                    </select>


                    <div className={styles.form_horizontal}>
                        <input className={styles.button_accept} 
                                type="submit"  
                                value="Agregar"/>
                        <input className={styles.button_cancel} 
                                type="submit" 
                                onClick={onClose} 
                                value="Cancelar"/>
                    </div>
                </form>
                </>}
            </div>
            
    )
}
