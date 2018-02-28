import React from 'react';
import PropTypes from 'prop-types';

const TableList = ({todoItemsChoice})=>{

 const onAddItemChoiceAndPriceHandler  = item =>
  (
   <tr key={item.key}>
    <th>{item.choice}</th>
    <th>$ {item.price}</th>
   </tr>
  );
 const listItemsChoiceAndPrice = todoItemsChoice.map(onAddItemChoiceAndPriceHandler);

  return (
     <tbody>
     {listItemsChoiceAndPrice}
     </tbody>
     )
   };

export default TableList;

TableList.defaultProps ={
 makeArrowSort: [],
};

TableList.propTypes = {
 makeArrowSort: PropTypes.array,
};

