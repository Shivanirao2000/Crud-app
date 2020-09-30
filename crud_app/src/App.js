import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing.js";
import DetailPage from "./components/DetailPage.js";
// import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost.js";
import Header from "./components/Header.js";

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Switch>
        <div className="container">
        <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/posts/:id" component={DetailPage} />
          <Route path="/edit/:id" component={EditPost} />
          
        </div>
      </Switch>
      </React.Fragment>
    );
  }
}



export default App;

