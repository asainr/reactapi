import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Head =()=>{
    let history = useHistory<any>();

    const handleLogout = async (e:any) => {
        e.preventDefault();
          const res = await axios.post("/logout",).then((res:any) => {
            localStorage.clear();
            history.push(`/`)   
          });
      };
    
    return (
        
           <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/Home">HOME</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active" to="/todo">TODO</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active" to="/create">CREATE POST</Link>
                        </li>
                        <ul className="navbar-nav">
                        <li className="nav-item">
                       <button type="button" onClick={handleLogout} className="nav-link btn-danger btn-sn text-white">Logout</button> 
                       </li>
                       </ul>
                    </ul>
                </div>
            </div>
        </nav>
      )
}
export default Head;