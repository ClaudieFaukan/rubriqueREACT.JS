import React, { Component, Fragment } from "react";
import Categorie from "./Categorie";
import CategorieForm from "./CategorieForm";

import './App.css';


class App extends Component {
  state = {
    categories: [],
    count: 0
  };

  handleDelete = id => {
    const categories = [...this.state.categories];
    const index = categories.findIndex(categorie => categorie.id === id);
    fetch("http://localhost:5000/rubrique",
    {method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              accept: 'application/json'},
    body:JSON.stringify({categorie:id})
    })
    
  };

  handleAdd = categorie => {
    const categories = [...this.state.categories];
    const libelle = categorie.libelle;
   if (categories.findIndex(categorie => categorie.libelle === libelle) === -1){
      fetch("http://localhost:5000/rubrique",
        {method: 'POST',
        headers: {'Content-Type': 'application/json',
                  accept: 'application/json'},
        body:JSON.stringify({categorie:libelle})
        })
      .then(this.componentDidMount());
    }
    else{
      alert("Libelle déjà pris")
    }
  };

  handleUpdate = categorie => {
    console.log(Categorie.onUpdate);
    const categories = [...this.state.categories];
    const libelle = categorie.libelle;
    fetch("http://localhost:5000/rubrique",
    {method: 'PUT',
    headers: {'Content-Type': 'application/json',
              accept: 'application/json'},
    body:JSON.stringify({categorie:libelle})
    })
  .then(this.componentDidMount());
  }


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
        <h1>liste des categories</h1>
        <ul>
          {this.state.categories.map(categorie => (
            <Categorie key={categorie.id} details={categorie} onDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
          )) }
        
        </ul>
        <CategorieForm onCategorieAdd={this.handleAdd} />
        
      </Fragment>
    );
  }
}
export default App;