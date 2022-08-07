import React from 'react'
import {
    ListGroup,
    ListGroupItem,
    Button
  } from "reactstrap";
  import { Link } from "react-router-dom";
const Table = () => {
  return (
    <div>
           <ListGroup className="mt-4">
            <ListGroupItem className="d-flex" >
                <strong>Shubham</strong>
                <div className="ml-auto">
                
                <Button  color="danger">Delete</Button>
                </div>
            </ListGroupItem>
</ListGroup>
    </div>
  )
}

export default Table