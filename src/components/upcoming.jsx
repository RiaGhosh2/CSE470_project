import React,{useState, useEffect} from 'react'
import { makeStyles, Grid,Paper, Button } from '@material-ui/core'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {host} from '../host';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) =>({

    grid:{
        marginTop:theme.spacing(10),
        height:'100%',
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',        
     },
     snackbar:{
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
     },
     password:{
        marginTop: theme.spacing(2)
      },
      signup:{
        marginTop: theme.spacing(2)
      },
      paperStyle:{
        padding :20,
        height:'70vh',
        width:500, 
        margin:"20px auto",
  
     },
     signupSection:{
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(3)
     }
    
    
}))

 

const Tmdb =()=>{
     const [check,setCheck] =useState(false);
     const [rows,Setrows]= useState([]);
     const [open,setOpen] =useState({
        status:false,
        message: " ",

     })

        const history = useHistory();

        const handleRoute = (result) =>{
      
              history.push('/'+result)

        }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
      };

      function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
       }
   
     const  pullingData = async() => {

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
        const auth = await axios.get(host+"/api/auth",config);

        console.log(auth.data._id);

        const data = await axios.post(host+"/api/posts/mypost/status",{
            'id':auth.data._id
        },config);
        if(data.data){
            Setrows(data.data);
            console.log("profile data "+data.data)
        }
 
    }   catch (error) {
     
        history.push('/login')
    }
  

     }
    
    useEffect(() => {
      
      pullingData();
  
   },[])

    const classes = useStyles();

    return(
      <>
        <Grid className={classes.grid}>
            
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Car</TableCell>
                          <TableCell align="center">Phone</TableCell>
                          <TableCell align="center">Location</TableCell>                          
                          <TableCell align="center">Car Picture</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Price</TableCell>                         
                          <TableCell align="center">Status</TableCell>


                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(0).reverse().map((row) => (
                          <TableRow key={row._id}>
                            
                            <TableCell component="th" scope="row">
                             {row.name}
                            </TableCell>
                            <TableCell align="center">{row.car}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                             <TableCell align="center">{row.location}</TableCell> 
                             <TableCell align="center"><img src={row.image} style={{width:400}} alt={row.shows} /></TableCell>
                             <TableCell align="center">{row.text}</TableCell>
                             <TableCell align="center">{row.price} TK</TableCell>                                                        
                             {(row.carstatus == "true")? <TableCell align="center"><Button variant="contained" color="Primary">Approved</Button></TableCell>
                             :<TableCell align="center"><Button variant="contained" color="secondary">Pending</Button></TableCell>}     
                          </TableRow>
                        ))}
                      </TableBody>
                   </Table>
             </TableContainer>   
            
        </Grid>

     <div className={classes.snackbar}>

            <Snackbar  open={open.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert  severity={open.severity} onClose={handleClose}>
                    {open.message}
                </Alert>
            </Snackbar>  
                
     </div>
        </>
    )
}

export default Tmdb;