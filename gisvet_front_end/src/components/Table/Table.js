import React, { useEffect, useState } from "react";
import css from './styles.module.css';
import icon_see_detalle from "./images/Icon_ver_detalle.png"



export default function Table({headers, data, actionItem, keyName}){

    const dataHeaders = headers
    const [dataBody, setDataBody] = useState(data)

    useEffect(()=>{
        setDataBody(data)
    }, [data])

    const onClickItem= function(event){
        actionItem(event.target.value)
    }


    return (<div className={css.table_data}>
                <table className={css.table_format}>
                    <thead>
                        <tr>
                            {dataHeaders.map((element, index)=>
                                <th key={index}>{element}</th>
                            )}
                            {actionItem!=undefined?
                                <th key={'action'}>{'Ver Detalle'}</th>
                                :<></>
                            }
                        </tr>
                    </thead>
                    {dataBody!=[] && dataBody!=undefined?
                        <tbody>
                            {dataBody.map((element, index)=>
                                <tr key={index}> 
                                    { Object.values(element).map((value,index)=>
                                        dataBody!=[] && dataBody!=undefined?
                                            <td key={index}>{value}</td>
                                        :<></>
                                    )}
                                    {actionItem!=undefined &&
                                        <td key={'action'}>
                                            <input className={css.button_table_goTo} type='image' onClick={onClickItem} src={icon_see_detalle} width="30" height="30" value ={element[keyName]}/>
                                        </td>
                                    }

                                </tr> 
                            )}
                        </tbody>
                        :<></>
                    }
                    
                </table>
            </div>
    )

}

