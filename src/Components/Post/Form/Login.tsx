import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const Login = () =>{
    let history = useHistory<any>();
    const [username, setUsername] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    
   

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res:any =  await axios.post("/login", { username, password }).then((res:any) => {
        localStorage.setItem('AccessToken', res.data.accessToken);
        history.push(`/Home`)   
      });
    } catch (err) {
      alert("Incorrect Username and Password");
    }
  };

    return(
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4>Login</h4>
                    </div>
                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                            <div className="form-group mb3">
                                <label>UserName</label>
                                <input type="name" name="name" onChange={(e) => setUsername(e.target.value)} className="form-control"/>
                                <span></span>
                            </div> <br />

                            <div className="form-group mb3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                                <span></span>
                            </div>
                            <br />
                            <div className="form-group mb3">
                               <button type="submit" className ="btn btn-primary">Login</button>
                             </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
export default Login