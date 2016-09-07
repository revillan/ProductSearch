import React from 'react';

class AddProductForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      product_url: "",
      image_url: "vcbkjwsgq5xztftzqbrz"
    };
  }

  update(field){
    return e => { this.setState({[field]: e.currentTarget.value }); };
  }

  handleSubmit(e){
    e.preventDefault();
    const products = this.state;
    this.props.createProduct({ products });
    
    if (this.state.name !== "" && this.state.description !== "" &&
        this.state.product_url !== "") {
          this.props.closeModal();
        }
  }

  upload(e) {
    e.preventDefault();
    let that = this;
    cloudinary.openUploadWidget( CLOUDINARY_OPTIONS,
      function(error, results) {
        if (!error) {
          debugger
          that.setState({ image_url: results[0].public_id });
        }
    });
  }

  renderErrors(){
    return(
      <ul className="error-list">
        {this.props.errors.map( (error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          { this.renderErrors() }
          <label className="form-label">Name: <input type="text" onChange={this.update("name")}/></label>
          <label className="form-label">Description: <input type="text" onChange={this.update("description")} /></label>
          <label className="form-label">Product URL: <input type="text" onChange={this.update("product_url")} /></label>
          <label className="form-label"> <button onClick={this.upload.bind(this)}>Upload Image</button> </label>

          <input type="button" className="btn" value="Submit" onClick={this.handleSubmit.bind(this)}  />
        </form>
      </div>
    );
  }
}

export default AddProductForm;
