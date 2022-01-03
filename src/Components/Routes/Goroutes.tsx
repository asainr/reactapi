import Authpost from '../Post/Home/Authpost';
import Userlist from '../Post/Form/Userlist'
import Createpost from '../Post/Form/Createpost';
import Todo from '../Post/Todo/Todo';
import {BrowserRouter,Route } from 'react-router-dom';


function Goroutes() {

    return (
      <BrowserRouter>
        <Route exact path="/Home" component={Authpost} />
        <Route path="/todo" component={Todo} />
        <Route path="/create" component={Createpost}/>
        <Route  path="/user/:id" component={Userlist} />
  </BrowserRouter>
    )
  }
  
  export default Goroutes;
  
