import React, { Component } from 'react';
import uuid from 'uuid';
import TableListHeader from '../Table/TableListHeader';
import TableList from '../Table/TableList';
import Footer from '../Footer/Footer'
import _ from 'lodash';

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
     choice: this.inputItemChoice.value,
     price: this.inputItemPrice.value,
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

 makeArrowSort = ()=>{
  let  sortedItems;
  const todoItemsChoice = this.state.items;
  if(this.state.arrowSorter){
   sortedItems = _.orderBy(todoItemsChoice, [item => item.choice.toLowerCase()], ['desc']);
  }
  else{
   sortedItems = _.orderBy(todoItemsChoice, [item => item.choice.toLowerCase()], ['asc']);
  }
  this.setState(()=>{
   return {arrowSorter: !this.state.arrowSorter,
    items:sortedItems
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
      <TableListHeader makeArrowSort= {this.makeArrowSort}
                       arrowSorter={this.state.arrowSorter}/>
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
