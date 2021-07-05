import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from "./components/Base/Navbar";
import Join from "./components/Chat/Join";
import ChatHome from "./components/Chat/ChatHome";
import Chat from "./components/Chat/Chat";
// import Loading from "./components/Base/Loading";
import NotFound from './components/Base/NotFound'

function App() {
  return (
    <div>

      {/* <Loading /> */}
      {/* <Navbar /> */}
      {/* <div className="container-fluid mt-5 pt-2" > */}
      <Route exact path="/" component={Join} />
      <Route exact path="/chat" component={ChatHome} />
      <Route path="/chat/:userid" exact component={Chat} />

      {/* <Route component={NotFound} /> */}
      {/* </div> */}

    </div>
  );
}

export default App;
