import React from 'react';
//import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import '../App.css';
import Menu from './MenuComponent';
import DishDetail from  './DishDetail';
import { DISHES } from '../shared/dishes';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }
  onDishSelect = (dish, comments) => {
      this.setState({
        selectedDish: dish,
      });
  }

  render(){
  return (
    <div>
        <Navbar dark color="primary">
            <div className="container">
                <NavbarBrand href="/">Ristrorabte Con Fusion</NavbarBrand>
            </div>
        </Navbar>
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail mydish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]}/>
    </div>
  );
}
}
