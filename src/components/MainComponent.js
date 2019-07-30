import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from  './DishDetail';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';


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
    const HomePage = () => {
      return (
        <Home />
      );
    }

  return (
    <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
            <Redirect to="/home" />
        </Switch>
        <Footer />
    </div>
  );
}
}
