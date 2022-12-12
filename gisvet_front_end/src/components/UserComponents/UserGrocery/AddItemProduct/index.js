import React, { useContext,useEffect, useState } from "react";
import styles from './styles.module.css';
import UserProductsContext  from "context/UserContext/UserProductsContext";
import icon_User_Form from "./images/Icon_Add_User_Form.png";
import { presentations,measurement_units } from "constants/constants";
import Loading from "components/GeneralComponents/Loading";



//==========importaciones compoentes primereact======//
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';

const formatProducts = (dataProducts)=>{
    let productsFormated = []
    dataProducts.map(productItem =>{
        if(!productsFormated.some(item => item.ID_PRODUCT === productItem.ID_PRODUCT)){
            let productAux = Object.assign({}, productItem)
            delete productAux.TOTAL_PRODUCT
            delete productAux.PRESENTATION
            productsFormated.push(productAux);
        }
    })
    return productsFormated
}



export default function AddItemProduct({onSubmit, onClose}){
    const {products,brands,loading} = useContext(UserProductsContext);
    const [productSelected, setProductSelected] = useState()
    const [productFormated, setProductFormated] = useState([])


    const [dataReady, setDataReady] = useState(false)

    const [data, setData] = useState({
        product_name: '',
        measurement_units : '',
    	type_product: '',
    	expiration_date: '',
        quantity_per_unit: 0,
    	price: 0,
        invima: '',
        manufacturing_date: '',
        presentation: '',
        quantity:0,
        iup:"",
        name_brand:""
    });

    useEffect(()=>{
        if(productSelected !== undefined){
            addProductData(productSelected)
        }
        
    },[productSelected])

    useEffect(()=>{
        if(products !== undefined && brands !== undefined){
            setProductFormated(formatProducts(products))
            setDataReady(true)
        }
    },[products, brands])

    const addProductData = (id)=>{
        let product = products.find(item => item.ID_PRODUCT === id)
        let newData = {...data, ['product_name']:product.PRODUCT_NAME}
        newData['type_product']=product.TYPE_PRODUCT
        newData['measurement_units']=product.MEASUREMENT_UNITS
        setData (newData)
    }

    useEffect(()=>{
        console.log(data)
    },[data])

    const doSubmit = (event)=>{
        event.preventDefault();
        const regex = /\//g
        data.manufacturing_date = (data.manufacturing_date.toLocaleDateString()).replace(regex,"-")
        data.expiration_date = (data.expiration_date.toLocaleDateString()).replace(regex,"-")
        onSubmit(data)
    }

    const getUnitsData = ()=>{
        let unitsName = ' '
        if(data.measurement_units !== ''){
            unitsName = unitsName+ measurement_units.find(unit => unit.id === data.measurement_units).name
        }
        return unitsName
    }

    const handleChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData)
    }

    const handleChangeCalendar = (event)=>{
        let {name, value} = event.target;
        const regex = /\//g
        const formatDate = (value.toLocaleDateString()).replace(regex,"-")
        console.log(value)
        let newData = {...data, [name]: formatDate}
        setData(newData)
    }



    return (
            <div className={styles.form_add_item_general}>
                {dataReady ?<>
                <div className={styles.title_image}> 
                    <img src={icon_User_Form} alt="user" width="40" height="40"/>
                    <h1> Registro de productos por lote</h1>
                </div>
                <form className={styles.form_add_user}
                     onSubmit={doSubmit}>

                    <div className="card">
                        <div className="field">
                            <label htmlFor="name_brand">
                            Seleccione Marca del producto
                            </label>
                            <Dropdown name="name_brand"
                                value={data.name_brand} 
                                options={brands} 
                                onChange={handleChange}
                                className="w-full"
                                optionLabel="NAME_BRAND" 
                                optionValue="NAME_BRAND"
                                required={true}
                                placeholder="Seleccione una marca" />
                        </div>
                        <div className="field">
                            <label htmlFor="product_name">
                                Seleccione el producto
                            </label>
                            <Dropdown 
                                    value={productSelected} 
                                    options={productFormated} 
                                    onChange={(e)=>{setProductSelected(e.value)}} 
                                    className="w-full"
                                    optionLabel="PRODUCT_NAME" 
                                    optionValue="ID_PRODUCT"
                                    required={true}
                                    placeholder="Seleccione un producto" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="iup">
                                    Identificador Único
                                </label>
                                <InputText name="iup"
                                        value={data.iup} 
                                        onChange={handleChange}
                                        required={true}
                                        className="w-full" 
                                /> 
                            </div>
                            <div className="field col">
                                <label htmlFor="invima">
                                    Invima
                                </label>
                                <InputText name="invima"
                                            value={data.invima} 
                                           required={true} 
                                           onChange={handleChange}
                                           className="w-full" 
                                /> 
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col-12 md:col-5">
                                <label htmlFor="presentation">
                                    Presentación a agregar
                                </label>
                                <Dropdown name="presentation"
                                    value={data.presentation} 
                                    options={presentations} 
                                    onChange={handleChange}
                                    className="w-full"
                                    optionLabel="name" 
                                    optionValue="id"
                                    required={true} 
                                    placeholder="Seleccione una presentación" />
                            </div>
                            <div className="field col-12 md:col-7">
                                <label htmlFor="quantity_per_unit">
                                    Cantidad unidades por presentación
                                </label>
                                <InputNumber name="quantity_per_unit"
                                           value={data.quantity_per_unit}
                                           onValueChange={handleChange}
                                           className="w-full"
                                           mode="decimal"
                                           suffix={getUnitsData()}
                                           buttonLayout="horizontal"  
                                           showButtons
                                           min={1}
                                           required={true} 
                                /> 
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="manufacturing_date">
                                    Fecha de Fabricación
                                </label>
                                <Calendar name="manufacturing_date"
                                    value={data.manufacturing_date}
                                    onChange={handleChange}
                                    className="w-full"
                                    showOnFocus	
                                    baseZIndex={1201}
                                    touchUI
                                    required={true}
                                    showIcon/>
                            </div>
                            <div className="field col">
                                <label htmlFor="expiration_date">
                                    Fecha de Vencimiento
                                </label>
                                <Calendar name="expiration_date"
                                    value={data.expiration_date} 
                                    onChange={handleChange}
                                    showOnFocus	
                                    className="w-full"
                                    baseZIndex={1201}
                                    touchUI
                                    required={true}
                                    showIcon/>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="price">
                                Precio por unidad
                            </label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">$</span>
                                <InputNumber name="price"
                                        value={data.price} 
                                        onValueChange={handleChange}
                                        className="w-full"
                                        mode="decimal" 
                                        required={true} 
                                        placeholder="Precio por unidad"
                                /> 
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="quantity">
                                Cantidad a registrar
                            </label>
                            <InputNumber name="quantity"
                                        value={data.quantity} 
                                        onValueChange={handleChange}
                                        className="w-full"
                                        mode="decimal" 
                                        showButtons
                                        required={true} 
                                        buttonLayout="horizontal" 
                                        min={1}
                            /> 
                        </div>
                    </div>

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
                </>
                :<Loading text="Cargando Datos"></Loading>
                }
            </div>
            
    )
}
