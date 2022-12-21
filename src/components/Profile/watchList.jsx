import React,{useState,useEffect,useRef, useContext } from 'react'
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import {Card, makeStyles,Grid,Paper, Avatar, TextField, Button, Typography,Link,CardMedia ,CardActions, CardActionArea, CardContent,} from '@material-ui/core'
import { useHistory,useLocation } from "react-router-dom";
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


import {host} from '../../host'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { storage } from '../../Firebase/firebase';
import { v4 } from 'uuid';
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles((theme) =>({
    container:{
        
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
      containernew:{
        
        marginTop:theme.spacing(2),
        height:'50%',
        display:'flex',
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        alignItems:"center",
        justifyContent:"space-between",
          [theme.breakpoints.down("sm")]:{
               display:'flex',
               flexDirection: 'column'
         }
        
     },
     media:{
         height:1,
         paddingTop:'56.25%',
         
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
       Media1:{
         height:400,
         width:500,
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
     Button:{
         marginTop:theme.spacing(2),
         display:'flex',
         flexDirection: 'row',
         justifyContent:'right'
     },
     avatar:{
         display:'flex',
         
         
     },
     Name:{
         marginTop:5,
         marginLeft:5,
         
     },
     Status:{
         marginTop:theme.spacing(2),
     },
      root: {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
      },
      inline: {
        display: 'inline',
      },
      Comments:{
           display:"flex",
           flexDirection:"column",
           marginLeft:theme.spacing(2),
      },
      dividerColor: {
       Color: 'blue',
      },
      CommentWrite:{
        
          display: 'flex',
          width: '100%',
          maxWidth: '100vh',
          backgroundColor: theme.palette.background.paper,
          
        
      },


      
    
      Container:{
        
        marginBottom:theme.spacing(5),
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
     Media:{
         height:350,
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:350
         }
     },
     setup:{
        marginTop:theme.spacing(5),
     },
     numberoflines:{
          WebkitLineClamp:1
     },
     pagination:{
          marginTop: theme.spacing(5),
          display: "flex",
          justifyContent: "center"
     },
     root1: {
        borderRadius:15,
        background: 'white',
        marginRight: theme.spacing(2)
      },
     
      textField: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(2),
        width: '43vh',
        marginTop: theme.spacing(12),
        justifyContent: "center",
        [theme.breakpoints.up("sm")]:{
            marginLeft: theme.spacing(8),
        }
        
        
      },
      loading: {
        
            width: '100%',
            justifyContent:'center',
            '& > * + *': {
              marginTop: theme.spacing(2),
            },
      
        },
        ratting:{
           display:'flex',
           justifyContent:'space-around'
        },
          fab: {
          margin: theme.spacing(2),
        },
        absolute: {
          position: 'absolute',
          bottom: theme.spacing(2),
          right: theme.spacing(3),
        },
        tooltip:{
          textAlign:'center'
         
        },
        start:{
        minWidth: '100%',
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(4)
        },
        input:{
          marginTop: theme.spacing(1)
        },

}))




const WatchList = () => {
  const classes = useStyles();
  const [Details, setDetails] = useState([]);
  const [trend, setTrend] = useState();
  const [search,setSearch] =useState();




  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  //////////////////////////////////

  const [imageUpload, setImageUpload] = useState('');

  const [imageInfo, setImageInfo] = useState([]);

  const uploadFile = () => {
    if (imageUpload == ''){
      console.log('open')
      handleClickOpen();
    }else{
      const dynamicImageName = `carReselling/${imageUpload.name + v4()}`;
      const imageRef = ref(storage, dynamicImageName);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // dispatch(formActions.addImageInfoFn({url: url, fileName: dynamicImageName}));
          setImageInfo({url: url, fileName: dynamicImageName});
          console.log(url);
        });
      });
    }

  };
  
//////////////////////ratting///////////////////////////

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

///////////////////////////////////////////////////////


  const descriptionElementRef = React.useRef(null);

  //////////////////////////////////////////////////////////////
  
      const [fieldError,setError] = useState({                
                 name:"",
                 phone:"",
                 Phone:"",
                 Status:"",
                 address:"",
                 mechanic:"",
                 date:""});

    const [name, setname] = useState("");
    const [Address,setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [Status, setStatus] = useState("");

   const history = useHistory();
   const {state} = useLocation();

    const handleRoute = (result) =>{      
    history.push('/'+result)
   }
    
    const avatarStyle={backgroundColor:'#3F51B5'}
    const btnstyle={margin:'8px 0'}


    const exampleInput = useRef();
    const loginHandler = async(e)=>{
          
        console.log("working");
        
        try {

        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }

            let data = await axios.put(host+"/api/profiles/watchlist"+[e],{                
                "title":trend,
                "image":imageInfo.url,
                "ratting":value,
                "tmdb":imageInfo.name,
              },config);
              handleClose();
              window.location.reload(false);
            } catch(error) {

            const err = error.response.data 
           }
   }

     useEffect(async() => {
                console.log("Details "+Details);      
               

      },[search])

      const detailpage = (
              <div> <Card className={classes.containernew}  >
                <CardActionArea>
                    <CardMedia className={classes.Media1}
                    image={imageInfo.url}
                    
                     />                       
                  <CardContent className={classes.numberoflines}>
                                
                  </CardContent> 
         
                </CardActionArea>

            <CardActionArea className={classes.ratting}>
              
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />                    
                 <TextField id="outlined-basic" label="Car Model " variant="outlined" onChange={(e)=>setTrend(e.target.value)} />
                     
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
              <Button onClick={()=> loginHandler()} variant="contained" color="primary">Submit</Button>         
                </CardActionArea>
               
            </Card>
        </div>
      )

   return (
       <>
        <div className={classes.start}>
{/* Photo Upload feature */}

          <input
          className={classes.input}
        type="file"
        onChange={(event) => {
        setImageUpload(event.target.files[0]);
          
        }}
        
      />
      
      <Button variant="contained" color="primary" onClick={uploadFile}>
  Upload Cars
</Button>
{/* Photo Upload feature */}
<div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
        <DialogTitle id="alert-dialog-title">{"Please,Choose your file at first!"}</DialogTitle>
        </DialogContent>
      </Dialog>
    </div>

      </div>
       {(imageInfo.length === 0)? <h1></h1> : detailpage}


 
    </>
   )
};

export default WatchList;