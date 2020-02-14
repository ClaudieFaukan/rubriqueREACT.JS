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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="entrez une catégorie"
          value={this.state.newCategorie}
          onChange={this.handleChange}
        />
        <button>ajouter à la liste</button>
      </form>

      
    );
  }
}

export default CategorieForm;
