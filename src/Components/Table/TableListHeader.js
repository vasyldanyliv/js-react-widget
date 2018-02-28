import React from 'react';
import PropTypes from 'prop-types';

const TableListHeader = ({makeArrowSort,arrowSorter})=> {
 const arrowDirection = arrowSorter ?
  (<p className="triangle-sorted down-sorted-arrow"> </p>) :
  (<p className="triangle-sorted up-sorted-arrow"> </p>);

 return(
  <thead>
  <tr>
   <th>
    <div className='container-name-sort'>
     <p className='title-name-item'>NAME</p>
     <span
      onClick={makeArrowSort}
      className="button-arrow-sorter">
      {arrowDirection}
    </span>
    </div>
   </th>
   <th>Amount</th>
  </tr>
  </thead>

 )
};

export default TableListHeader

TableListHeader.defaultProps ={
 makeArrowSort: [],
};

TableListHeader.propTypes = {
 makeArrowSort: PropTypes.func,
};
