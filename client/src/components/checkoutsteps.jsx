import React from 'react';

const CheckOutSteps = props => {
  return (
    <div className="progress-bar">
      <div className={props.step2 ? "activated" : ""}>Shipping</div>
      <div className={props.step1 ? "activated" : ""}>Sign In</div>
      <div className={props.step3 ? "activated" : ""}>Payment</div>
      <div className={props.step4 ? "activated" : ""}>Place Order</div>
    </div>
  );
}


export default CheckOutSteps;