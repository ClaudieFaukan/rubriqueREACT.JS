import React, { Component } from "react";

class CategorieForm extends Component {
  state = {
    newCategorie: ""
  };

  handleChange = event => {
      this.setState({ newCategorie: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = -1//new Date().getTime();
    const libelle = this.state.newCategorie;
    this.props.onCategorieAdd({ id, libelle });
    this.setState({ newCategorie: "" });
  };

  render() {
    return (
      <form class="form-inline" onSubmit={this.handleSubmit}>
        <div class="form-group col-3">
          <input class="form-control" type="text" placeholder="entrez une catégorie" value={this.state.newCategorie} onChange={this.handleChange}/>
        </div>
        <button class="btn btn-primary">ajouter à la liste</button>  
         
      </form>

      
    );
  }
}

export default CategorieForm;
