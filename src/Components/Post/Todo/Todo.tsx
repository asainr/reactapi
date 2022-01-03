import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, Row, Col } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Head from "../../Headers/header";

const Todo = () => {
  const [TodoData, setTodoData] = useState<any>();

  function todo() {
    axios
      .get(`https://gorest.co.in/public/v1/todos`)
      .then((response: AxiosResponse) => {
        setTodoData(response.data);
      });
  }

  const todoo = (page: any) => {
    axios
      .get(`https://gorest.co.in/public/v1/todos?page=${page}`)
      .then((response: AxiosResponse) => {
        setTodoData(response.data);
      });
  };

  useEffect(() => {
    todo();
  }, []);

  return (
    <div>
      <Head></Head>
      <>
        <h2
          style={{ color: "forestgreen", margin: "20px", textAlign: "center" }}
        >
          TODO PAGE
        </h2>
        <Container>
          <Row>
            {TodoData &&
              TodoData.data &&
              TodoData.data.length &&
              TodoData.data.map((data: any) => {
                return (
                  <Col sm={4} md={6} xl={6} style={{ marginBottom: "10px" }}>
                    <CardGroup>
                      <Card style={{ border: "2px solid green" }}>
                        <Card.Body>
                          <Card.Title>{data.title}</Card.Title>
                          <Card.Text>{data.due_on}</Card.Text>
                          <Button variant="primary">{data.status}</Button>
                        </Card.Body>
                      </Card>
                    </CardGroup>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </>
     
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() =>
            todoo(
              `${
                TodoData &&
                TodoData.data &&
                TodoData.data.length &&
                TodoData.meta.pagination.page - 1
              }`
            )
          }
        >
          prev
        </Button>
        <Button onClick={() => todoo(1)}>{`${
          TodoData &&
          TodoData.data &&
          TodoData.data.length &&
          TodoData.meta.pagination.page
        }`}</Button>
        <Button
          onClick={() =>
            todoo(
              `${
                TodoData &&
                TodoData.data &&
                TodoData.data.length &&
                TodoData.meta.pagination.page + 1
              }`
            )
          }
        >
          next
        </Button>
      </div>
      </div>
  );
};

export default Todo;
