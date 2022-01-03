import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import Head from "../../Headers/header";
import { Link } from "react-router-dom";
import { ExportCSV } from "../Excel/ExportCsv";

const Authpost = () => {
  const [UseData, setUseData] = useState<any>([]);
  const [filter, setfilter] = useState<any>([]);
  const [listDatafilter, setListDatafilter] = useState<any>([]);
  const fileName = 'Go Rest API'

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v1/posts`)
      .then((response: AxiosResponse) => {
        setUseData(response.data);
      });
  }, []);

  const pagegination = (page: any) => {
    axios
      .get(`https://gorest.co.in/public/v1/posts?page=${page}`)
      .then((response: AxiosResponse) => {
        setUseData(response.data);
      });
  };

  useEffect(() => {
    if (
      Object.keys(UseData).length &&
      UseData &&
      UseData.data &&
      UseData.data.length
    ) {
      let finalData: any[] = [];
      UseData.data.forEach((element: any) => {
        axios
          .get(`https://gorest.co.in/public/v1/users/${element.user_id}`)
          .then((response: any) => {
            let res = response.data.data;
            let dres = delete element.id;
            finalData.push({ ...element, ...res });
            const timer = setTimeout(() => {
              let arrdd: any[] = finalData;
              setListDatafilter([...arrdd]);
            }, 1000);
            return () => clearTimeout(timer);
          });
      });
    }
  }, [UseData]);

  const dataSearch =
    listDatafilter.length &&
    listDatafilter.filter((data: any) => {
      return Object.keys(data).some((key) =>
        data[key]
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase())
      );
    });

  console.log(dataSearch);

  return (
    <div className="App">
      <Head></Head>
      <React.Fragment>
        <Container>
          <Row>
            <div className="col-12 mb-15">
              <div className="mb-3 col-4 mx-auto text-center">
                <div>
                  <h2 style={{ color: "forestgreen", textAlign: "center" }}>
                    Home Page with Posts and Author Name
                  </h2>
                </div>
                <label className="form-label h4">Search</label>{" "}
                <input
                  type="text"
                  className="from-control"
                  onChange={(e) => setfilter(e.target.value)}
                />
                <div>
                <ExportCSV  csvData={dataSearch} fileName={fileName} />
              </div>
              </div>
            </div>
            {dataSearch &&
              dataSearch.length &&
              dataSearch.map((data: any, index: any) => {
                return (
                  <Col sm={4} md={6} xl={6} style={{ marginBottom: "10px" }}>
                    {" "}
                    <div
                      className="card h-100"
                      style={{ border: "2px solid green" }}
                    >
                      <Link to={`/user/${data.id}`}>
                        <h1 className="card-header">{data.name}</h1>
                      </Link>
                      <h4 className="card-header">{data.title}</h4>
                      <div className="card-body">
                        <p className="card-text">{data.body}</p>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </React.Fragment>

      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button onClick={() => pagegination(1)}>first Page</Button>
        <Button
          onClick={() =>
            pagegination(
              `${
                UseData &&
                UseData.data &&
                UseData.data.length &&
                UseData.meta.pagination.page - 1
              }`
            )
          }
        >
          prev
        </Button>
        <Button onClick={() => pagegination(1)}>{`${
          UseData &&
          UseData.data &&
          UseData.data.length &&
          UseData.meta.pagination.page
        }`}</Button>
        <Button
          onClick={() =>
            pagegination(
              `${
                UseData &&
                UseData.data &&
                UseData.data.length &&
                UseData.meta.pagination.page + 1
              }`
            )
          }
        >
          next
        </Button>
        <Button
          onClick={() =>
            pagegination(
              `${
                UseData &&
                UseData.data &&
                UseData.data.length &&
                UseData.meta.pagination.pages
              }`
            )
          }
        >
          Last Page
        </Button>
      </div>
    </div>
  );
};
export default Authpost;
