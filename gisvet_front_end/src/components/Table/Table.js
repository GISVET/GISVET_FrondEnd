import React, { useEffect } from "react";
import './styles.css';



export default function Table(props){

    const header =props.header
    const data = props.data

    return (<div className="table-data">
                <table className="table-format">
                    <thead>
                        <tr>
                            {header.map((element, index)=>
                                <th key={index}>{element}</th>
                            )}
                        </tr>
                    </thead>
                    {data!=[] && data!=undefined?
                        <tbody>
                            {data.map((element, index)=>
                                <tr key={index}> 
                                    { Object.values(element).map((value,index)=>
                                        <td key={index}>{value}</td>
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

