import React, { useEffect, useState } from "react";
import './styles.css';



export default function Table({headers, data, updateList}){

    const dataHeaders = headers
    const [dataBody, setDataBody] = useState(data)

    useEffect(()=>{
        setDataBody(data)
    }, [data])


    return (<div className="table-data">
                <table className="table-format">
                    <thead>
                        <tr>
                            {dataHeaders.map((element, index)=>
                                <th key={index}>{element}</th>
                            )}
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
                                </tr> 
                            )}
                        </tbody>
                        :<></>
                    }
                    
                </table>
            </div>
    )

}

