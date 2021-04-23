import React from "react";
import { Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components'
import "./App.css";
import PizzaForm from './PizzaForm';

const StyledTopBar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 1%;
`;

const StyledH1 = styled.h1`
  font-family: 'Original Surfer', sans-serif;
  font-size: 3rem;
  color: #f46159;
  text-align: center;
`

const BodyStyles = styled.div`
  background-color: #f4f4f4;
  width: 100%;
  height: 100vh;
  font-size: 62.5%;
`

const NavStyles = styled.div`
  font-size: 2rem;
  font-family: 'Original Surfer', sans-serif;
`

const PizzaLink = styled.div`
  width: 100%;
  height: 50vh;
  background-image:url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-position: center;
  background-repeat:no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PizzaButton = styled.button`
  padding: .5% 3%;
  opacity: 80%;
  font-family: 'Original Surfer';
  font-size: 2rem;
  text-decoration: none;
  background-color: #fcb670;
  border-radius: 10px;
  border: 2px solid black;
`








const App = () => {
  return (
  <BodyStyles>
    <StyledTopBar>
      <StyledH1>Lambda Eats</StyledH1>
      <NavStyles className='nav-links'>
        <Link to='/' style={{ textDecoration: 'none' }}>Home</Link>&nbsp;
        <Link to='/help' style={{ textDecoration: 'none' }}>Help</Link>
      </NavStyles>
    </StyledTopBar>

    <Switch>
      <Route exact path='/'>
        <PizzaLink>
          <PizzaButton><Link id='order-pizza' to='/pizza' style={{ textDecoration: 'none' }}>Pizza?</Link></PizzaButton>
        </PizzaLink>
      </Route>
      <Route path='/help'>
        <StyledH1>Help!</StyledH1>
      </Route>
      <Route path='/pizza'>
        <PizzaForm id='pizza-form'/>
      </Route>
    </Switch>


  </BodyStyles>
  );
};
export default App;
