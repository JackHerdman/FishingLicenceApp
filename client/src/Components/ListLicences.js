import React, { useState } from "react";
import Licence from "./Licence";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";


export default function ListLicences(props) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Container className="p-3 my-3 border  ml-auto">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                <div class="input-group-append">
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={() => setSearchTerm("")}>Clear</button>
                </div>
            </div>

            <Link type='button' className="btn btn-success btn-block" to="/create-new">Add New +</Link>
            
            <ul>{props.licences.map(l => <Licence key={l.licenceNumber} licence={l} />)}</ul>
        </Container>
    )
}