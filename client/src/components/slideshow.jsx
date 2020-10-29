import React, { Component } from 'react';
// import Image1 from "https://myronbankbank.s3-ap-southeast-1.amazonaws.com/H1.jpg";
// import Image2 from "https://myronbankbank.s3-ap-southeast-1.amazonaws.com/H2.jpg";
// import Image3 from "https://myronbankbank.s3-ap-southeast-1.amazonaws.com/H3.jpg";
import Rellax from 'rellax';

class Slideshow extends Component {
  state = {
    slideIndex: 1,
    status: [
      true,
      false,
      false
    ]
  }

  plusSlides(current) {
    const maxNumberOfImages = this.state.status.length;
    if (this.state.slideIndex >= maxNumberOfImages && current === 1) { current = 1 }
    else if (this.state.slideIndex === 1 && current === -1) {
      current = maxNumberOfImages;
    }
    else { current += this.state.slideIndex }
    this.showSlides(current, this.state.slideIndex);
  }

  showSlides(current, prev) {
    const status = [...this.state.status];
    for (let i = 0; i < this.state.status.length; i++) {
      status[i] = false;
    }
    status[current - 1] = true;
    this.setState({ status, slideIndex: current });
  }

  componentDidMount() {
    new Rellax('heroRellax', {
      speed: -5,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="slideshow-container heroRellax">
          {this.state.status[0] && <div className="mySlides fade">
            <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/H1.jpg" alt="cover" />
          </div>}
          {this.state.status[1] && <div className="mySlides fade">
            <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/H2.jpg" alt="cover" />
          </div>}
          {this.state.status[2] && <div className="mySlides fade">
            <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/H3.jpg" alt="cover" />
          </div>}
          <span className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</span>
          <span className="next" onClick={() => this.plusSlides(1)}>&#10095;</span>
        </div>
      </React.Fragment>
    );
  }
}

export default Slideshow;