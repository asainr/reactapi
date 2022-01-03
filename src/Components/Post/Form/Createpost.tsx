import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form, Alert, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Head from '../../Headers/header';

const token = "2d2c2842af9c1bc1d85fd23e25f2808dd28ac02e2c29dce368d55841a10ddb34";

axios.interceptors.request.use(
  (req: any) => {
    req.headers.authorization = `Bearer ${token}`;

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const Createpost = () => {
 
  let history = useHistory<any>();
  const [title, settitle] = useState<any>([]);
  const [body, setbody] = useState<any>([]);
  const [user_id, setuser_id] = useState<any>([]);
  const [postid, setpostid] = useState<any>([]);

  useEffect(() => {
    axios.get(`https://gorest.co.in/public/v1/users`).then((response: any) => {
      setpostid(response.data);
      setuser_id(response.data.data[0].id)
    });
  },[]);

  console.log(postid)
  

  const postData = async (e:any) => {
    e.preventDefault()
    axios
      .post(`https://gorest.co.in/public/v1/posts`, {
        user_id,
        title,
        body,
      })
      .then(() => {
        alert("Success");
        history.push(`/user/${user_id}`);
      }).catch(() => {
      alert("This Faild");
  });
  }
  return (
    <div className="App">
      <Head></Head>
      <h1 style={{textAlign:'center'}}>Create Post</h1>
      <Alert variant="success">
        <Alert.Heading></Alert.Heading>
        <Card body>
        <div style={{textAlign:'center'}}>
        <div className="form-group row ">
          <label className="col-sm-1 col-form-label">USER NAME</label>
          <div className="col-sm-3">
            <div className="md-form mt-0">
          <Form.Select
          className="form-control"
            aria-label="Default select example"
            onChange={(e) => setuser_id(e.target.value)}
          >
            {postid && postid.data &&
              postid.data.length &&
              postid.data.map((data: any,index:any  ) => {
                return <option key={index} value={data.id}>{data.name}</option>;
              })}
          </Form.Select>
          </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 col-form-label">TITLE</label>
          <div className="col-sm-3">
            <div className="md-form mt-0">
              <input
                type="text"
                className="form-control"
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 col-form-label">BODY</label>
          <div className="col-sm-3">
            <div className="md-form mt-0">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setbody(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <Button type="submit" variant="primary" onClick={postData}>
              ADD
            </Button>
          </div>
        </div>
      </div>
      </Card>
      </Alert>
    
      
    </div>
  );
};
export default Createpost;
