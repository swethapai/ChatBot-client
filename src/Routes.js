import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Lucene from "./Lucene";
import FileSearch from "./FileSearch"
import MongoDB from "./MongoDB";


function AppRouter() {
    return (
        <Router>
            <div id="menu">
                <nav>
                    <Link to="/" id="item" id="red">File Search </Link>

                    <Link to="/lucene/" id="item">Lucene </Link>

                    <Link to="/mongodb/" id="item">MongoDB </Link>

                    <Link to="/mysql/" id="item">MySQL</Link>

                </nav>

                <Route path="/" exact component={FileSearch} />
                <Route path="/lucene/" component={Lucene} />
                <Route path="/mongodb/" component={MongoDB} />
            </div>
        </Router>
    );
}

export default AppRouter;