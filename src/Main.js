import './assets/main.css';
import mgwTheme from './theme/mgwTheme';
import React from 'react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material';

import NavBar from './components/NavBar';
import { Home, Explore, Create } from './views/collection.js';

export default class Main extends React.Component {
  BASE_API_URL = "http://localhost:3388";

  state = {
    active: 'home',
    countriesData: null,
    categoriesData: null,
    articlesData: null
  };

  render() {
    return (
      <ThemeProvider theme={mgwTheme}>
        <NavBar
          setActive={this.renderView}
          active={this.state.active}/>
        { this.renderView() }
      </ThemeProvider>
    );
  }

  renderView() {
    if (this.state.active === 'explore') {
      return <Explore />;
    } else if (this.state.active === 'create') {
      return <Create />;
    } else {
      return <Home />;
    }
  }

  setActive(view) {
    this.setState({
      active: view
    })
  }

  async componentDidMount() {
    let gCountries = await axios.get(this.BASE_API_URL + '/countries/cities');
    let gCategories = await axios.get(this.BASE_API_URL + '/categories/subcats');
    let gArticles = await axios.get(this.BASE_API_URL + '/articles');

    this.setState({
      countriesData: gCountries.data,
      categoriesData: gCategories.data,
      articlesData: gArticles.data
    });
};
}
