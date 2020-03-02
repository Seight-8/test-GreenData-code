import React from 'react';
import './App.css';
import List from './components/list';
import Head from './components/head';
import Content from './components/content';

function App() {
  return (
    <div>
      <Head />

      <List />
      <Content />
    </div>
  );
}

export default App;
