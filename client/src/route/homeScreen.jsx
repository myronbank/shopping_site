import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Slideshow from '../components/slideshow';
import VerticalSlides from '../components/verticalSlides';

const HomeScreen = () => {

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [])

  return (
    loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <div className="home">
          <div className="home__content">
            <Slideshow></Slideshow>
            <ul className="products mainRellax">
              {
                products.map(product => {
                  return <li className="product" key={product._id}>
                    <div className="product__image">
                      <Link to={"/product/" + product._id}><img src={product.image[0]} alt="product"></img></Link>
                    </div>
                    <div className="product__style"></div>
                    <div className="product__content">
                      <Link to={"/product/" + product._id}>{product.name}</Link>
                      <span>${product.price}</span>
                    </div>
                  </li>
                })
              }
            </ul>
          </div >
          <VerticalSlides className="vSlide" />
          <div className="spriteContainer">
            <Link to="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/2020_Qdo_catalogue.pdf">
              <h5> Download the latest product catalogue ! </h5>
              <div className="animatedSprite"></div></Link>
          </div>
        </div>
  );
}

export default HomeScreen;



