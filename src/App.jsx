import { BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./Views/about";
import Detailpage from "./Views/Detailpage";
import Profilepage from "./Views/Profile";
import Profilepages from "./Views/Profiles";
import Home from "./Views/Home";
import Trending from "./Views/Trending";
import Search from "./Views/Search";
import Databasesearch from "./Views/Databasesearch";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect,useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./components/admin/Admin";
import AdminPanel from "./Views/Adminpanel";
import Adminpost from "./Views/adminpost";
import Adminapproved from "./Views/Adminapproved";
import {host} from './host';
import Yourpost from "./Views/yourposts";
import FindPost from "./Views/findposts";
import Upcoming from "./Views/upcoming"

const App = () => {

    const history = useHistory();

     const [auth, setAuth] = useState(false)
     useEffect(async() => {
        
      let config = {
         headers:{
             "content-Type":"application/json"
         }
     }
     try {
         
         config = {
             headers:{
                 "content-Type":"application/json",
                 "x-auth-token": localStorage.getItem("authToken")
             }
         }
         
 
         const data = await axios.get(host+"/api/posts",config);
         setAuth(true);
        
       } catch (error) {
           
       }        
     }, [auth])

     console.log(auth);
  
  
      return(
        <Router> 
        <Navbar/>     
         <Switch>
         <Route path="/admin"  component={Admin}/>      
         <Route path="/login" component={Login}/>
         <Route path="/register" component={Register}/>
         
         <ProtectedRoute path="/" exact component={Home} /> 
 
         <ProtectedRoute path="/about" exact component={About}/>
         <ProtectedRoute exact path="/trending" component={Trending} />
         <ProtectedRoute path="/search" exact component={Search}/>
         <ProtectedRoute path="/moviestvshows" exact component={Databasesearch} />
         <ProtectedRoute path="/details/:id/:type" component={Detailpage}/>
         <ProtectedRoute path="/profile/:id" component={Profilepage}/>
         <ProtectedRoute path="/profiles/:id" component={Profilepages}/>
         <ProtectedRoute path="/adminpanel"  component={AdminPanel}/>               
         <ProtectedRoute path="/adminapproved"  component={Adminapproved}/>
         <ProtectedRoute path="/adminpost"  component={Adminpost}/>        
         <ProtectedRoute path="/myposts"  component={Yourpost}/>    
         <ProtectedRoute path="/findposts"  component={FindPost}/>
         <ProtectedRoute path="/status"  component={Upcoming}/>          
         </Switch>  
        </Router>
        
        
      )
 
    

  
};

export default App;