import React, { Component } from 'react';
import InputArea from '../InputArea/InputArea';

class Header extends Component {
 constructor(props){
  super(props);

  this.state = {
   isOpen: true
  };
 }

 makeCollapse = ()=>{
  this.setState(()=>{
   return {isOpen: !this.state.isOpen}})
 };

 render() {
  const {isOpen}= this.state;
  const collapseArrow = isOpen ? (<i className="arrow-collapse up"> </i>) :
   (<i className="arrow-collapse down"> </i>);

  return (
    <div>
     <div className='container-header'>
     <div className='container-header-items'>
      <p className='header-title-text'>Expenses</p>
      <button onClick={this.makeCollapse}
              className='header-collapse-button'>
       {collapseArrow}
      </button>
     </div>
    </div>
    {isOpen? <InputArea/> :null }
    </div>
  )
 }
}

export default Header;
