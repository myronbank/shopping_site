import React, { Component } from 'react';
import Joi from "joi";
import Input from "./input";
import TextArea from './textarea';

class Form extends Component {

  state = {
    field: {},
    errors: {},
    image: [],
  }

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schemaRule).validate(this.state.field, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  validateField = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schemaRule[name] };
    const { error } = Joi.object(schema).validate(obj);
    if (!error) return null;
    return error.details[0].message;
  }

  handleChange = ({ target: inputField }) => {
    const error = {};
    const errorMessage = this.validateField(inputField.name, inputField.value);
    if (errorMessage) error[inputField.name] = errorMessage;
    else delete this.state.errors[inputField.name];

    const newField = { ...this.state.field };
    newField[inputField.name] = inputField.value;
    this.setState({ field: newField, errors: error });
  }

  handleSubmit = () => {
    console.log(this.state.field);
    const error = this.validate();
    if (error) {
      console.log("not validated");
      return false;
    }
    return true;
  }

  handleSelect = (event) => {
    let image = [];
    for (let i = 0; i < event.target.files.length; i++) {
      image[i] = event.target.files.item(i);
    }
    image = image.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)?/));
    let message = `${image.length} valid image(s) selected`;
    this.setState({ image, message });
  }

  generateButton = (label, onClick, disabled = this.validate()) => {
    return (
      <React.Fragment>
        {this.state.field._id ? <button className="button" onClick={onClick}>{label}</button> :
          <button disabled={disabled} className="button" onClick={onClick}>{label}</button>}
      </React.Fragment>)
  }

  generateForm = (name, label, type = "text") => {
    return (
      <Input name={name}
        label={label}
        value={this.state.field[name] || ""}
        type={type}
        onChange={this.handleChange}
        errors={this.state.errors[name]} ></Input>
    )
  }

  generateTextArea = (name, label, type = "text", rows, cols) => {
    return (
      <TextArea name={name}
        label={label}
        value={this.state.field[name] || ""}
        type={type}
        rows={rows}
        cols={cols}
        onChange={this.handleChange}
        errors={this.state.errors[name]} ></TextArea>
    )
  }

  generateUploadForm = () => {
    return (
      <React.Fragment>
        <label htmlFor="image">Image</label>
        <input name="image"
          id="image"
          type="file"
          onChange={this.handleSelect}
          ref={this.input}
          multiple />
      </React.Fragment>)

  }
}

export default Form;