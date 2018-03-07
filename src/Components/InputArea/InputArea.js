import React, { Component } from 'react';
import uuid from 'uuid';
import TableListHeader from '../Table/TableListHeader';
import TableList from '../Table/TableList';
import Footer from '../Footer/Footer'

class InputArea extends Component {

 constructor(props){
  super(props);
  let data = this.getLocalStorageData();
  this.state = {
   items: data.items,
   totalSum: data.totalSum,
   arrowSorter: false,
  };
 }

 addItemChoiceAndPrice = (e) => {
  const regExpForInputChoice = /^[a-zA-Z]+$/;
  const inputItemChoice = this.inputItemChoice.value;
  const inputItemPrice = this.inputItemPrice.value;

  if (e.keyCode === 13 || e.type === 'click') {
   const itemArray = this.state.items;

  // validation
   if ((inputItemChoice && inputItemPrice)!== ''
    && inputItemChoice.match(regExpForInputChoice)
    && inputItemPrice  > 0 )
   {
    itemArray.push({
     choice: inputItemChoice,
     price: inputItemPrice,
     key: uuid.v1()
    });
    const totalSum = itemArray.map(item =>parseFloat(item.price)).reduce((cur, prev)=>{
     return prev + cur});

    this.setState(()=>{
      return {item: itemArray,
       totalSum: totalSum
      }},
     ()=>{this.saveLocalStorageData()});
    this.inputItemChoice.value = '';
    this.inputItemPrice.value = '';
   }
  }
 };

 makeArrowSort = (sortedArray, directionOfArrow)=> {
  this.setState(()=>{
   return {arrowSorter: directionOfArrow,
    items:sortedArray
   }},()=>{this.saveLocalStorageData()});
 };

 getLocalStorageData = ()=>{
  if( !(!!localStorage.getItem("DATA"))  ){
   return {items: [], totalSum: [] }
  } else{
   return JSON.parse(localStorage.getItem("DATA"));
  }
 };

 saveLocalStorageData = ()=> {
  let data = JSON.stringify({
   items: this.state.items,
  totalSum: this.state.totalSum
  });
  localStorage.setItem("DATA", data);
 };

 render(){
  return(
   <div>
    <div className='container-for-table'>
     <table className='table-container'>
      <TableListHeader makeArrowSort = {this.makeArrowSort}
                       arrowSorter={this.state.arrowSorter}
                       todoItemsChoice={this.state.items}
      />
      <TableList todoItemsChoice={this.state.items}/>
     </table>
    </div>
      <div className='container-input-text'>
    <div className='container-input-value-content'>
     <div className="container-item-input">
      <input className="item-input" type="text"
             onKeyDown = {this.addItemChoiceAndPrice}
             ref={input =>this.inputItemChoice = input}
      /></div>
     <div className="container-second-column">
      <div className="container-price-input" >$
       <input className ='price-input' type="text"
              onKeyDown = {this.addItemChoiceAndPrice}
              ref={input =>this.inputItemPrice = input}
       /></div>
      <div>
       <button className="add-input"
               onClick = {this.addItemChoiceAndPrice}>
        +
       </button>
      </div>
     </div>
    </div>
   </div>
    <Footer totalSum ={this.state.totalSum}/>
   </div>
  )
 }

}

export default InputArea;
