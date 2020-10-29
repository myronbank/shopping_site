import React from "react";
import Form from "../components/form";
import Joi from "joi";
import isLogIn from '../util/userLogInStatus';
import Loader from "../webStaticbackground/round_shape_loader.gif";
import { submitPhoto } from "../service/submissionService";

class FanSubmissionScreen extends Form {
  state = {
    field: {
      image: ""
    },
    errors: {},
    image: [],
    imageUrls: [],
    display: false,
    loading: false
  }

  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  schemaRule = {
    image: Joi.string()
  }

  doSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(this.form.current);
    this.setState({ loading: true, display: false });
    formData.set('image', this.state.image[0], this.state.image[0].name);
    const { data } = await submitPhoto("/api/submitPhoto", formData);
    if (data) this.setState({ loading: false });
  }

  openForm = (product) => {
    this.setState({ display: true });
  }

  closeForm = (e) => {
    e.preventDefault();
    this.setState({ display: false });
  }
  render() {
    return (
      <React.Fragment>
        <div className="cardWithPhoto__container">
          <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/fanSubmission.gif"></img>
          {isLogIn() ? <div><button className="button cardWithPhoto__button" onClick={() => this.openForm({})}>Submit A Photo!</button></div>
            : <p> please log in first</p>}
        </div>

        {this.state.loading && <img className="loader" src={Loader} alt="Loading" />}
        {this.state.display && <div className="form">
          <h3>"Submit new photo"</h3>
          <form onSubmit={this.doSumbit} className="form-content" ref={this.form} >
            {this.generateUploadForm()}
            <br />
            {this.generateButton("Submit", this.doSubmit, false)}
            <br />
            <button className="button" onClick={this.closeForm}>Back</button>
          </form>
        </div>}
      </React.Fragment>
    );
  }
}

export default FanSubmissionScreen;