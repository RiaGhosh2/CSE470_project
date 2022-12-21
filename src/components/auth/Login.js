import React,{useState} from 'react'
import { makeStyles, Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory,useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {host} from '../../host';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles((theme) =>({

    grid:{
        marginTop:theme.spacing(9),
        height:900,
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',
        backgroundImage:`url(${"https://cdn4.vectorstock.com/i/1000x1000/15/88/dark-car-with-headlight-vector-9761588.jpg"})`,
        justifyContent:'center',
        backdropFilter: "blur(5px)",
     },
     paperStyle:{

        padding :20,
        height:'70vh',
        width:500, 
        margin:"20px auto",
        
     },
     password:{
       marginTop: theme.spacing(2)
     },
     color:{
         color:"blue"
     }
    
    
}))
const Login=()=>{
    
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [check,setCheck] =useState(false);
    const [open,setOpen] =useState({
       status:false,
       message: " ",
       

    })

   const history = useHistory();
   const {state} = useLocation();
   const classes = useStyles();

   const handleRoute = (result) =>{
      
    history.push('/'+result)
   }
    
    const avatarStyle={backgroundColor:'#3F51B5'}
    const btnstyle={margin:'8px 0'}

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const loginHandler = async(e)=>{
          
        console.log("working");
        let config = {
            headers:{
                "content-Type":"application/json"
            }
        }
        try {
            let data = await axios.post(host+"/api/auth",{                
                "email":email,
                "password":password
              },config);
            console.log(data.data);
            localStorage.setItem("authToken", data.data.token);
            console.log(localStorage.getItem("authToken"));
            config = {
                headers:{
                    "content-Type":"application/json",
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }

            data = await axios.get(host+"/api/auth",config);
            if(data.data){
                setOpen({
                    status:true,
                    message: "Login Successful",
                    severity: "success",
                    
                    
                },
                setCheck(true))
                history.push(state?.from || '/')
                window.location.reload(false);
            }
           
        } catch (error) {
            setOpen({
                status:true,
                message: "Login Failed",
                severity: "error",
                
            })
      }
   }

    return(
        <>
        <Grid className={classes.grid}>
            {(check==true)? <h1>welcome</h1> : 
            <Paper elevation={12} className={classes.paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><VpnKeyIcon/></Avatar>
                     <Typography variant="h4" component="h1">
                      Log In
                     </Typography>
                </Grid>
                <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Email"
                   type="email"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setEmail(e.target.value)}
                   fullWidth
                  />
                <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Password"
                   type="password"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setPassword(e.target.value)}
                   fullWidth
                  />
                
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={()=> loginHandler()} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography onClick={()=> handleRoute("register")}> Do you have an account ?
                     
                        <Button onClick={()=> handleRoute("register")} className={classes.color}>Sign Up </Button> 
                
                </Typography>
                                <Typography onClick={()=> handleRoute("admin")}> are you an admin ?
                     
                        <Button onClick={()=> handleRoute("register")} className={classes.color}>Admin </Button> 
                
                </Typography>
            </Paper>
            }
        </Grid>
        <div className={classes.snackbar}>
            
        <Snackbar open={open.status} autoHideDuration={6000} onClose={handleClose}>
            <Alert  severity={open.severity} onClose={handleClose}>
                {open.message}
            </Alert>
        </Snackbar>
     </div>
     </>
    )
}

export default Login