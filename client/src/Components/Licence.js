import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";


export default function Licence(props) {
    let expiry = ""// startDate + licenceLength algorithm
    let abalone = props.licence.abalone ? "Yes" : "No";
    let lobster = props.licence.lobster ? "Yes" : "No";

    return (
            <Container className="rounded p-3 my-3 border ml-auto">
                <Row>
                    <Col sm={8}>
                        <p><h6 className="font-weight-bolder">Licence Number: </h6>{props.licence.licenceNumber}</p>
                        <p><h6 className="font-weight-bolder">Name: </h6>{props.licence.firstName} {props.licence.lastName}</p>
                        <p><h6 className="font-weight-bolder">Date of Birth: </h6>{props.licence.dateOfBirth}</p>
                        <p><h6 className="font-weight-bolder">Expiry Date: </h6>{expiry}</p>
                        <Row>
                            <Col sm={4}>
                                <h6 className="font-weight-bolder">Abalone: </h6>{abalone}
                            </Col>
                            <Col sm={4}>
                                <h6 className="font-weight-bolder"> Rock Lobster: </h6>{lobster}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4} className="align-self-center">
                        <Link type="button" className='btn btn-lg btn-primary mt-2' to="/">View / Update</Link><br />
                        <Link type="button" className='btn btn-lg btn-danger mt-2' to={`/delete/${props.licence.licenceNumber}`}>Delete</Link>
                    </Col>
                </Row>
            </Container>
    )
}