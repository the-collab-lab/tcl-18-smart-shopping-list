import React from 'react';
import ButtonCreateList from 'components/ButtonCreateList';
import JoinListForm from 'components/JoinListForm';

const Home = () => (
  <section className="Home">
    <h1>Welcome to your smart shopping list!</h1>
    <h3>Tap "Create shopping list" to get started.</h3>
    <ButtonCreateList />
    <JoinListForm />
  </section>
);
export default Home;
