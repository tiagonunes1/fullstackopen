import React from 'react'


const PersonForm = ({ text,value,onChange }) =>{
    return(
        <div>
     <div>{text}: <input value={value} onChange={onChange}/></div>
     </div>
    )
}
export default PersonForm