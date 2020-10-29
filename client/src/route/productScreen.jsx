import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";


function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const displayBox = useRef(null);

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, [])

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  }

  const handleClick = (e) => {
    displayBox.current.src = e.target.src;
  }

  return (
    <React.Fragment>
      <div className="breadcrumb">
        <Link to="/"> &#9720; Back to results</Link>
      </div>
      {loading ? <div>loading...</div> :
        error ? <div>{error}</div> :
          <div>
            <div className="details">
              <div className="details-image">
                <div className="details-image-container">
                  {Object.keys(product).length > 1 && product.image.map(image => <img onClick={handleClick} src={image} alt="more product shots" />)}
                </div>
                <div>{Object.keys(product).length > 1 && <img className="details-image-display" ref={displayBox} src={product.image[0]} alt="enlarged_photo" />}</div>
              </div>
              <div className="details-info">
                <ul>
                  <li>
                    <h4 className="details-info-productName">{product.name}</h4>
                  </li>
                  <li>
                    {product.rating} Stars
            </li>
                  <li>
                    Price: $<b>{product.price}</b>
                  </li>
                  <li className="details-info-description">
                    Description:
                    <div>
                      {product.description}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="details-action">
                <ul>
                  <li>
                    Price: $<b>{product.price}</b>
                  </li>
                  <li>
                    Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                  </li>
                  <li>
                    Qty: <select value={qty} onChange={e => { setQty(e.target.value) }}>
                      {[...Array(product.countInStock).keys()].map(x => {
                        return <option key={x + 1} value={x + 1} >{x + 1}</option>
                      })}
                    </select>
                  </li>
                  <li>
                    {product.countInStock > 0 &&
                      <button onClick={handleAddToCart} className="button">Add to Cart</button>
                    }</li>

                </ul>

              </div>
            </div>
          </div>}
    </React.Fragment>)
}

export default ProductScreen;