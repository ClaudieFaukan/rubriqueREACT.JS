import React, { Component, Fragment } from "react";
import Categorie from "./Categorie";
import CategorieForm from "./CategorieForm";


import './App.css';

class App extends React.Component {
 
    state = {
      categories: [],
      count: 0,
    };
   

  handleDelete = id => {
    const categories = [...this.state.categories];
    fetch("http://localhost:5000/rubrique",
    {method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              accept: 'application/json'},
    body:JSON.stringify({categorie:id})
    }).then(res => res.json())
    .then((resj)=>{
   let index=categories.findIndex(categorie => categorie.id === id)
    categories.splice(index,1)  
    this.setState({categories})})
  };

  handleAdd = categorie => {
    const categories = [...this.state.categories];
    const libelle = categorie.libelle;
   if (categories.findIndex(categorie => categorie.label === libelle) === -1){
      fetch("http://localhost:5000/rubrique",
        {method: 'POST',
        headers: {'Content-Type': 'application/json',
                  accept: 'application/json'},
        body:JSON.stringify({categorie:libelle})
        })
      .then(res => res.json())
      .then((resj)=>{
      categories.push(categorie={id:resj.data.insertId,label:libelle})
      this.setState({categories})
    })
      }
    else{
      alert("Libelle déjà pris")
    }
  };


  handleUpdate = categorie => 
  {
    const categories = [...this.state.categories];
    fetch("http://localhost:5000/rubrique",
    {method: 'PUT',
    headers: {'Content-Type': 'application/json',
              accept: 'application/json'},
    body:JSON.stringify({categorie})
    }).then(res => res.json())
    .then((resj)=>{ 
      const index=categories.findIndex(categorie => categorie.id === categorie.details.id)
      categories.splice(index,1)  
      this.setState({categories})})
      .then(()=>{
        categories.push(categorie={id:categorie.details.id,label:categorie.update})
      this.setState({categories})}
     )
  };
  componentDidMount(){
    fetch("http://localhost:5000/rubriques")
    .then(res => res.json())
    .then((resj)=>{
      this.setState({categories: resj.data})
    })
  }


  render() {
    return (
      <Fragment>
      <nav class="navbar navbar-light bg-light">
        <div class="navbar-brand mr-auto ml-auto">Gestion rubrique en REACT JS</div>
     </nav>
     <br/>
     <CategorieForm onCategorieAdd={this.handleAdd} />
     <br/>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">LABEL</th>
              <th scope="col">DELETE</th>
              <th scope="col">UPDATE LABEL</th>
              <th scope="col">UPDATE</th>
            </tr>
          </thead>
          <tbody>
           
              {this.state.categories.map(categorie => (
                <Categorie key={categorie.id} details={categorie} onDelete={this.handleDelete} onUpdate={this.handleUpdate} /> ))
              }
      
          </tbody>
        </table>
      </Fragment>
    );
  }
}
export default App;