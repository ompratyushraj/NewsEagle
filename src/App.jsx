import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import News from './Components/News'
import NewsItems from './Components/NewsItems'
import React , { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
// import REACT_APP_NEWS_API from '     /'

export class App extends Component {
  pageSize = 15;
 apiKey = import.meta.env.VITE_APP_NEWS_API;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress});
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          height= {4}
          progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general " pageSize={this.pageSize} country="us" category="general" />}/>
          <Route exact path="/Business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="Business" pageSize={this.pageSize} country="us" category="Business" />}/>
          <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="Entertainment" pageSize={this.pageSize} country="us" category="Entertainment" />}/>
          <Route exact path="/General" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="General" pageSize={this.pageSize} country="us" category="General" />}/>
          <Route exact path="/Health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="Health" pageSize={this.pageSize} country="us" category="Health" />}/>
          <Route exact path="/Science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="Science" pageSize={this.pageSize} country="us" category="Science" />}/>
          <Route exact path="/Sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="Sports" pageSize={this.pageSize} country="us" category="Sports" />}/>
          <Route exact path="/Technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="Technology" pageSize={this.pageSize} country="us" category="Technology" />}/>
        </Routes>
        {/* <NewsItems/> */}
        </Router>
      </div>
    )
  }
}

export default App

{/* <Router>
  <Routes>
    <Route/>
  </Routes>
</Router> */}