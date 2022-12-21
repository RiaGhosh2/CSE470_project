import { Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import AdminLeftbar from "../components/admin/AdminLeftbar";
import React,{useState,useEffect} from 'react'
import { useHistory,useLocation } from "react-router-dom";
import axios from 'axios';
import {host} from '../host';
import Posts from '../components/admin/posts'

const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("sm")]:{
             display: "none",
          }
      },
      texting:{
         marginTop:theme.spacing(50),
      }

}))






const Adminpost = () => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const classes = useStyles();
      const history = useHistory();

       const loginHandler = async(e)=>{
          
        

        try {

            let config = {
                headers:{
                    "content-Type":"application/json",
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }

            let data = await axios.get(host+"/api/auth",config);
            if(data.data.email != "admin@gmail.com"){

               localStorage.removeItem("authToken");
               history.push('/login');
               setAnchorEl(null);
               window.location.reload(false);

            }

            
           
        } catch (error) {
             console.log(error)
      }
   }

      useEffect(async(e) => {
          loginHandler();
      })

   return (
      <div>
       
        <Grid container>
           <Grid item sm={2} >
              <AdminLeftbar/>
           </Grid>
           <Grid item sm={10} xs={10}>
              <Posts/>
           </Grid>
        </Grid>
        <Add/>
        
      </div>
      
   )
};

export default Adminpost;