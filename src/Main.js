import './assets/main.css';
import mgwTheme from './themes/mgwTheme';
import React from 'react';
import axios from 'axios';
import { ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { NavBar } from './components/collection.js';
import { Home, Explore, Create } from './views/collection.js';

export default class Main extends React.Component {
  BASE_API_URL = "http://localhost:3388";

  state = {
    countriesData: null,
    categoriesData: null,
    articlesData: null
  };

  render() {
    return (
      <ThemeProvider theme={mgwTheme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </ThemeProvider>
    );
  }

  async componentDidMount() {
    // let gCountries = await axios.get(this.BASE_API_URL + '/countries/cities');
    // let gCategories = await axios.get(this.BASE_API_URL + '/categories/subcats');
    // let gArticles = await axios.get(this.BASE_API_URL + '/articles');

    // this.setState({
    //   countriesData: gCountries.data,
    //   categoriesData: gCategories.data,
    //   articlesData: gArticles.data
    // });
};
}
