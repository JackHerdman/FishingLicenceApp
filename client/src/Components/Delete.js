import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"


export default function Delete() {
    let { id } = useParams();
    const [licence, SetLicence] = useState();
    useEffect(() => {
        fetch(`http://localhost:4000/licences/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((json) => SetLicence(json));
    }, []);
    debugger;
    return (
        <div>   
            {licence &&
                <div>
                    <h2>Are you sure you wish to delete the following licence?</h2>
                    <Container className="rounded p-3 my-3 border ml-auto">
                        <Row>
                            <Col sm={4}>
                                <p><h6 className="font-weight-bolder">Licence Number: </h6>{licence.licenceNumber}</p>
                                <p><h6 className="font-weight-bolder">Name: </h6>{licence.firstName} {licence.lastName}</p>
                                <p><h6 className="font-weight-bolder">Date of Birth: </h6>{licence.dateOfBirth}</p>
                                <p><h6 className="font-weight-bolder">Licence Length: </h6>{licence.licenceLength}</p>
                            </Col>
                            <Col sm={4}>
                                <p><h6 className="font-weight-bolder">Mobile: </h6>{licence.mobile}</p>
                                <p><h6 className="font-weight-bolder">Email: </h6>{licence.email}</p>
                                <p><h6 className="font-weight-bolder">Address: </h6>{licence.address.street} {licence.address.suburb} {licence.address.state} {licence.address.postcode}</p>
                                <p><h6 className="font-weight-bolder">Expiry Date: </h6>{licence.expiry}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <h6 className="font-weight-bolder">Abalone: </h6>{licence.abalone.toString()}
                            </Col>
                            <Col sm={4}>
                                <h6 className="font-weight-bolder"> Rock Lobster: </h6>{licence.lobster.toString()}
                            </Col>
                        </Row>
                        <br />
                        <button type="button" className="btn btn-block btn-danger mt-2'">Confirm Delete</button>
                    </Container>
                </div >
            }
        </div >
    )
}