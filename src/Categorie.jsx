import React from "react";


const Categorie = ({ details, onDelete, onUpdate, update}) => (
  <tr>
    <th scope="row">{details.id}</th>
    <td> {details.label}</td>
    <td><button type="button" class="btn btn-danger" onClick={() => onDelete(details.id)}>Delete</button></td>
    <td><input key={details.id} name="input" placeholder={details.label} onChange={e => update=e.target.value} value={update}></input></td>  
    <td><button type="button" class="btn btn-warning"  onClick={() => onUpdate({details,update})}>Update</button></td>  
  </tr>
);

export default Categorie;
