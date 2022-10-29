import React, { useEffect, useState } from "react";
import './styles.css';
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


    return (<div className="table-data">
                <table className="table-format">
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
                                    {actionItem!=undefined?
                                        <td key={'action'}>
                                            <input className="add_user_form" type="image" onClick={onClickItem} src={icon_see_detalle} width="20" height="20" value ={element[keyName]}/>
                                        </td>
                                        :<></>
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

