import React, { useState, useEffect } from 'react';
import ListLicences from "./Components/ListLicences";
import CreateNew from "./Components/Create-New";
import Delete from "./Components/Delete";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Jumbotron, Container, Image, Row, Col } from "react-bootstrap";
import "./App.css"

export default function App() {

  const [licences, setLicences] = useState([]);

  function addLicence(l) {
    setLicences([...licences, l]);
  }

  useEffect(() => {
    fetch("http://localhost:4000/licences")
      .then((response) => response.json())
      .then((json) => setLicences(json));
  }, []);

  return (
    <div>
      <div class="pimg1">
        <div class="ptext">
          <span class="myborder">
            NSW Fishing Licence Management
          </span>
        </div>
      </div>

      <section class="section">
        <h1>This is my Section</h1>
      </section>

    </div>

    // <Router>
    //   <Container className="p-3 my-3 border  ml-auto">
    //     <Jumbotron>
    //       <Row>
    //         <Col sm={4}>
    //           <Image className="" src="./images/fishing.jpg" />
    //         </Col>
    //         <Col sm={8}>
    //           <h1>NSW Fishing Licence Management</h1>
    //         </Col>
    //       </Row>
    //     </Jumbotron>
    //     <Switch>
    //       <Route exact path="/">
    //         <ListLicences licences={licences} />
    //       </Route>
    //       <Route path="/create-new">
    //         <CreateNew />
    //       </Route>
    //       <Route path="/delete/:id">
    //         <Delete />
    //       </Route>
    //     </Switch>
    //   </Container>
    // </Router>
  );
}