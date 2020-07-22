import React from "react";
import ScriptTag from "react-script-tag";
import { Route, Switch } from "react-router-dom";

import './mag/css/bootstrap.min.css';
import "./mag/style.css";

import Preloader from "./components/Preloader";
import Header from "./components/Header";
import LatestNewsBanner from "./components/LatestNewsBanner";
import MainContent from "./components/MainContent";
import ViewSection from "./components/ViewSection";
import ViewTags from './components/ViewTags';
import ViewNews from "./components/ViewNews";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Preloader />
      <Header />

      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <LatestNewsBanner />
              <MainContent />
            </div>
          )}
        />

        <Route path="/item/:itemName" render={(props) => <ViewNews id={props.match.params.itemName} /> } />
        <Route path="/tag/:tagName" render={(props) => <ViewTags tag={props.match.params.tagName} /> } />
        <Route exact path="/:sectionName" render={(props) => <ViewSection section={props.match.params.sectionName} /> } />
      </Switch>

      <Footer />

      <ScriptTag
        type="text/javascript"
        src="http://192.168.56.1:3000/js/jquery/jquery-2.2.4.min.js"
      />
      <ScriptTag
        type="text/javascript"
        src="http://192.168.56.1:3000/js/bootstrap/popper.min.js"
      />
      <ScriptTag
        type="text/javascript"
        src="http://192.168.56.1:3000/js/bootstrap/bootstrap.min.js"
      />
      <ScriptTag
        type="text/javascript"
        src="http://192.168.56.1:3000/js/plugins/plugins.js"
      />
      <ScriptTag
        type="text/javascript"
        src="http://192.168.56.1:3000/js/active.js"
      />
    </div>
  );
}

export default App;
