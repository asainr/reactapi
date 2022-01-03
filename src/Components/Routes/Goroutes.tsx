import Authpost from '../Post/Home/Authpost';
import Userlist from '../Post/Form/Userlist'
import Createpost from '../Post/Form/Createpost';
import Todo from '../Post/Todo/Todo';
import {BrowserRouter,Route,Switch } from 'react-router-dom';
import Login from '../Post/Form/Login';
import PageNot from '../Headers/PageNot';

const PrivateRoute = (props:any) => {
  const token= localStorage.getItem('AccessToken');
  if(token){
    return <Route exact={true} path={props.path} component={props.component} />
  }else {
    return <Login {...props} />
  }
}

function Goroutes(props:any) {

    return (
      <BrowserRouter>
      <Switch>
         <Route exact={true} path="/" component={Login} />
         <PrivateRoute  path="/Home" component={Authpost} />
         <PrivateRoute path="/todo" component={Todo}/>
         <PrivateRoute  path="/create" component={Createpost}/>
        <PrivateRoute  path="/user/:id" component={Userlist}/> 
        <Route component={PageNot}/>
  </Switch>
  </BrowserRouter>
    )
  }
  
  export default Goroutes;
  