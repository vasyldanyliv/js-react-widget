import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableListHeader = ({arrowSorter, todoItemsChoice, makeArrowSort})=> {
 const arrowDirection = arrowSorter ?
  (<p className="triangle-sorted down-sorted-arrow"> </p>) :
  (<p className="triangle-sorted up-sorted-arrow"> </p>);

 const makeArrowSortHandler= ()=>{
  let  sortedItems;
  if(arrowSorter){
   sortedItems = _.orderBy(todoItemsChoice, [item => item.choice.toLowerCase()], ['desc']);
  }
  else{
   sortedItems = _.orderBy(todoItemsChoice, [item => item.choice.toLowerCase()], ['asc']);
  }

  makeArrowSort(sortedItems,!arrowSorter)
 };


 return(
  <thead>
  <tr>
   <th>
    <div className='container-name-sort'>
     <p className='title-name-item'>NAME</p>
     <span
      onClick={makeArrowSortHandler}
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
 todoItemsChoice: [],
};

TableListHeader.propTypes = {
 todoItemsChoice: PropTypes.array,
 makeArrowSortHandler: PropTypes.func,
};
