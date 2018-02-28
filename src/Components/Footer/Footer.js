import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({totalSum}) => {

  return (
   <div className='container-footer'>
    <div className='container-footer-items'>
     <p className='footer-title-total-text'>Total</p>
     <div className='footer-title-total-price'>
      $
      {totalSum}
     </div>
    </div>
   </div>
  )
};

export default Footer;

Footer.defaultProps ={
 totalSum: [],
};

Footer.propTypes = {
 totalSum: PropTypes.number.isRequired
};
