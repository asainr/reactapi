import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button,Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Head from "../../Headers/header";   

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

const Userlist = () =>{

    const [listuser, setlistuser] = useState<any>([]);
    const [listpost, setlistpost] = useState<any>([]);
    const urlParams = useParams<any>();
    const id = urlParams.id;

    const Userdata = () => {
        axios.get(`https://gorest.co.in/public/v1/users/${id}`)
        .then((response: any) => {
            setlistuser(response.data.data);
        })
    }

    const postdata = () =>{
        axios.get(`https://gorest.co.in/public/v1/users/${id}/posts`)
        .then((response: any) => {
            console.log(response.data)
            setlistpost(response.data);
            
        })
       }
        useEffect(() => {
            Userdata()
            postdata()
        },[])

    const onDelete = (id:any) => {
        axios.delete(`https://gorest.co.in/public/v1/posts/${id}`)
            .then(() => {
               postdata();
            })
    }

       return (
    <div className="App">
   <Head></Head>
<div>
<h2 style={{textAlign:'center'}}>USER DETAILS</h2>
      <Alert variant="success">
        <Alert.Heading></Alert.Heading>
        <div style={{textAlign:'center'}}>
           <p>
              <h4><p>{listuser.name}</p></h4>
           </p>
           <p>
              <h4><p>{listuser.email} </p></h4> 
           </p>
           <p>
               <h4><p>{listuser.gender} </p></h4>
           </p>
           <p>
            <h4><p>{listuser.status}</p> </h4> 
           </p>
           </div>
           </Alert>
       </div>
       <div>
       <h2 style={{textAlign:'center'}}>POST DETAILS</h2>
       <Alert variant="success">
 {listpost && listpost.data && listpost.data.length && listpost.data.map((data:any) => {
     return(
         <>
         <Card style={{ width: "100rem" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
          {data.title}
          </Card.Subtitle>
          <Card.Text>
          {data.body}
          </Card.Text>
        </Card.Body>
      </Card>
            <div style={{textAlign:'center'}} className="card-footer">
         <Button variant="btn btn-danger" onClick={() => onDelete(data.id)}>Delete</Button>
             </div> 
        </>
     )

     }
     )
     } 
          </Alert> 
       </div>
      
    </div>
);
}

export default Userlist;

