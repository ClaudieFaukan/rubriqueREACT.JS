import React from "react";

const Categorie = ({ details, onDelete,onUpdate}) => (
  <li>
    {details.id} -- {details.label} 
    <button onClick={() => onDelete(details.id)}>Delete</button>
    <input type="text" value= {this.details.libelle} onChange={()=> details.label= this.value}></input>  <button onClick={() => onUpdate(details)}>Update</button>
  </li>
);

export default Categorie;
