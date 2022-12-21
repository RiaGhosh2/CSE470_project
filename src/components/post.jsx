import { CardMedia,Avatar,TextField,Card,  makeStyles,CardActions, CardActionArea, CardContent, Typography,Button,Grid } from "@material-ui/core";
import React,{useState,useEffect,useRef, useContext } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import PublicIcon from '@material-ui/icons/Public';
import TheatersIcon from '@material-ui/icons/Theaters';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import { DetailsOutlined } from "@material-ui/icons";
import image from '../imagepost.png';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import {host} from '../host';
import moment from "moment";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { storage } from '../Firebase/firebase';
import { v4 } from 'uuid';

const useStyles = makeStyles((theme) =>({
    container:{
        
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
     media:{
         height:1,
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
        width: '100%',
        maxWidth: '100vh',
        maxWidth: '100vh',
        backgroundColor: theme.palette.background.paper,
        
    
      },
      inline: {
        display: 'inline',
      },
      Comments:{
           display:"flex",
           flexDirection:"column",
           
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
      avatarComment:{
         marginTop: theme.spacing(1.5),
         color: theme.palette.getContrastText(deepPurple[500]),
         backgroundColor: deepPurple[500],
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
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
      postMargin:{
        marginTop:theme.spacing(2)
      },
       date:{
        minWidth: '92%',
        textAlign:"right",
            [theme.breakpoints.down("sm")]:{
               minWidth: '80%',
        }
      },
      time:{
        minWidth: '100%',
        display:'flex',
        marginBottom:theme.spacing(2)
      },
      exatTime:{
        marginLeft:theme.spacing(0.5)
      },
            commentdate:{
        marginLeft:theme.spacing(2)
      },
      password:{
        marginTop: theme.spacing(3)
      },
      start:{
        minWidth: '100%',
        display: "flex",
        justifyContent: "center",
        marginTop:theme.spacing(3)
        },
        input:{
          marginTop: theme.spacing(1)
        }
}))

const Post = () => {
   let baseUrl;
   const [trend, setTrend] = useState([]);
   const [search,setSearch] =useState();

   const [loading,setLoading] =useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage,setPostsPerPage] = useState(9);
   const [Details, setDetails] = useState([])


   const classes = useStyles();
   const [postData,setPostData] = useState([]);
   const history = useHistory();
   const [createPost, setCreatePost]= useState();
   const [change,setChange] = useState(true);

   const [contentVisible, setContentState] = useState(false);
   const [selectComment,setSelectComment] = useState();
   const [name, setName] = useState();


   const [car, setCar] = useState("");
   const [Address,setAddress] = useState("");
   const [Phone, setPhone] = useState("");
   const [Price, setPrice] = useState("");

   const [imageUpload, setImageUpload] = useState('');

   const [imageInfo, setImageInfo] = useState([]);
 
   const uploadFile = () => {
     if (imageUpload == '') {
       handleOpened();
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

    const toggleCardContent = (result) => {
      
        setSelectComment(result);
        setContentState(!contentVisible);

    };   

   const handleRoute = (result) =>{
      
    history.push('/'+result)
   }
   let values;
   let Comment;


      const makeLike = async(e) =>{  
       console.log(e)       

        try {

        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }

        const data = await axios.put(host+"/api/posts/like/"+[e],{text: " "},config);
        console.log(data);
        
        setChange(!change);
        exampleInput.current.value = " "
       
        
       } catch (error) {
        
       }
     }

   const makeComment = async(e) =>{  
       console.log(e)       

        try {

        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }

        const data = await axios.put(host+"/api/posts/comment/"+[e],{text: Comment},config);
        console.log(data);
        
        setChange(!change);
        exampleInput.current.value = " "
       
        
       } catch (error) {
        
       }
     }
      const makePost = async(e) =>{         
        e.preventDefault();
        
        try {
            
            const config = {
                headers:{
                    "content-Type":"application/json",
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
            
            const data = await axios.post(host+"/api/posts",
            {text: values,
              car:car,
              location:Address,
              phone:Phone,
              price:Price,
              carstatus:'false',
              image: imageInfo.url,
              shows:imageInfo.fileName
             },config);
            
            setChange(!change);
            handleClickOpen();
            exampleInput.current.value = " "
           
            
        } catch (error) {
            
        }
   }

   useEffect(async(e) => {
    
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
        const data = await axios.get(host+"/api/posts/approved",config);
        const auth = await axios.get(host+"/api/auth",config);
        

        console.log(data)
        if(data.data){
            setName(auth.data.name);
            setPostData(data.data)
        }
 
    }   catch (error) {
     
        history.push('/login')
    }
  
   },[change,search])
    
    const exampleInput = useRef();

    const handleSubmit =(e)=>{
          
    }
    const onChange = (e)=>{
        values = e.target.value

    }
    const onComments = (e)=>{
        Comment = e.target.value
    }
   let count = 0;
   //////////////////////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = React.useState(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    console.log('Image Data'+  imageInfo)
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

  const handleOpened = () => {
    setOpened(true);
  };

  const handleClosed = () => {
    setOpened(false);
    
  };


  const card = (

       (imageInfo.length == 0)?
           (<Card >
      <CardActionArea>
        
        <CardMedia
          component="img"
          alt="Pick your Movie/Tv Show"
          height="400"
          width ="2"
          image={image}
          
        />

      </CardActionArea>

    </Card>):(
      <Card >
      <CardActionArea>
        
        <CardMedia
          component="img"
          alt="Pick your Movie/Tv Show"
          height="400"
          width ="2"
          image={imageInfo.url}
          title= {Details.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {Details.name}
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>

    )
  )


   return (
       <>
             
      <div>

      </div>   
         {card}
        <form  noValidate autoComplete="off" onSubmit={handleSubmit}>
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
  Upload Now
</Button>
{/* Photo Upload feature */}
        </div>
          <div className={classes.postMargin}>
          <TextField
                  
                  className={classes.password}
                  id="outlined-password-input"
                  label="Car Model"
                  type="text"
                  autoComplete="current-password"
                  variant="outlined"
                  inputRef={exampleInput}  
                  onChange={(e)=>setCar(e.target.value)}
                  fullWidth
                 />               
                  <TextField
                 
                  className={classes.password}
                  id="outlined-password-input"
                  label="Address"
                  type="text"
                  autoComplete="current-password"
                  variant="outlined"
                  inputRef={exampleInput}  
                  onChange={(e)=>setAddress(e.target.value)}
                  fullWidth
                 />                    
                  <TextField
                 

                  className={classes.password}
                  id="outlined-password-input"
                  label="Phone"
                  type="number"
                  autoComplete="current-password"
                  variant="outlined"
                  inputRef={exampleInput}  
                  onChange={(e)=>setPhone(e.target.value)}
                  fullWidth
                 /> 

                                    <TextField
                 
                  className={classes.password}
                  id="outlined-password-input"
                  label="Price"
                  type="number"
                  autoComplete="current-password"
                  variant="outlined"
                  inputRef={exampleInput}  
                  onChange={(e)=>setPrice(e.target.value)}
                  fullWidth
                 />       
          <TextField
          className={classes.password}
          id="outlined-multiline-static"
          label="More Details"
          multiline
          fullWidth
          rows={6}
          inputRef={exampleInput}   
          onChange={(e)=> onChange(e)}
          variant="outlined"
          
        />
          </div>
          <div className={classes.Button} >
        <Button variant="contained" color="primary" type="submit" onClick={(e)=> makePost(e)} >
          Post
        </Button>
         </div>
        </form>
       
        
       <Grid container spacing={2}>
           {postData.slice().reverse().map(result => {
               return ( 
            <Grid key={result._id} item md={12} xs={12} sm={6}>
                <Card className={classes.container}>
                   <CardActionArea>                      
                     <CardContent >
                  <div className={classes.time}>
                       <div >
                            <h5 className={classes.exatTime}>{moment(result.date).fromNow()}</h5>
                            
                      </div>
                      <div className={classes.date}>
                             <h5 >{moment(result.date).format("DD MMMM YYYY")}</h5>
                             <h5>{moment(result.date).format("hh:mm A")}</h5>
                             
                      </div>
                  </div>
                     <div className={classes.avatar}>
                     <Avatar
                     alt={result.name}
                     src="/static/images/avatar/1.jpg"
                     sx={{ width: 24, height: 24 }}
                     className={classes.orange}
                     />
                    <Typography gutterBottom variant="h6" className={classes.Name}>{result.name}</Typography>
                    </div>
                    <Typography variant="body2" className={classes.Status}>{result.text}</Typography>
                    </CardContent>
                    </CardActionArea>
                     <CardActionArea >
                    <CardMedia className={classes.media}
                          image={result.image}                        
                          />  
                     </CardActionArea>                                    
                   <CardActionArea>                      
                     <CardContent>             
                    <Typography variant="h5" className={classes.Status}></Typography>
                    </CardContent>
                    </CardActionArea>
                   <CardActionArea>
                   <div>
            <List className={classes.root2}>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <DriveEtaIcon color="primary"/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Car Model" secondary={result.car} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <TheatersIcon color="primary"/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary={result.location} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PermContactCalendarIcon color="primary"/>
            </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Contact Number" secondary={result.phone} />
            </ListItem>
                    <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <AttachMoneyIcon color="primary"/>
                   
                </Avatar>
                </ListItemAvatar>
                <Button variant="contained" color="primary">
                {result.price} Tk
                 </Button>
            </ListItem>
            </List>
            </div>
                   </CardActionArea>
                   <CardActions>
                       <Button size="small" color="Primary" onClick={()=> makeLike(result._id)}>Likes ({result.likes.length})</Button>
                       <Button size="small" color="Primary" onClick={() => 
                         
                          (result.comments.length>0)?toggleCardContent(result._id):toggleCardContent(result._id)
                                     
                        }>Comments ({result.comments.length})</Button>
                   </CardActions>
                   {(result._id == selectComment && contentVisible == true ) ? (
                   <CardActions className={classes.Comments}>
                        {result.comments.slice(0).reverse().map(comments=>{
                              if(comments.length !== 0){
                                  return (
                                <List className={classes.root} key={comments._id}>
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar className={classes.purple} alt={comments.name} src="/static/images/avatar/1.jpg" />
            
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={ 
                                    <React.Fragment>
                                        <Typography
                                          component="span"
                                          variant="h6"
                                          className={classes.inline}
                                          color="textPrimary"
                                        >
                                          {comments.name}
                                        </Typography>
                                        <Typography
                                          component="span"
                                          variant="body2"
                                          className={classes.commentdate}
                                          color="textPrimary"
                                        >
                                          {moment(comments.date).fromNow()}
                                        </Typography>
                                      </React.Fragment>}
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          component="span"
                                          variant="body1"
                                          className={classes.inline}
                                          color="textPrimary"
                                        >
                                          {comments.text}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                </ListItem>
                                <Divider classname={classes.dividerColor} variant="inset" component="li"/>
                                                            
                                </List> 
                                
                                )
                            } 
                        })}
                   
                        <div className={classes.CommentWrite}>
                        <Avatar className={classes.avatarComment}
                        
                          alt={name}
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 15, height: 17 }}
                          />
                        <TextField
                            id="standard-full-width"
                            label="Comment Here"
                            style={{ margin: 8 }}
                            placeholder="Write Here"
                            inputRef={exampleInput}
                            fullWidth
                            onChange={(e)=> onComments(e)}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <Button className={classes.Button}  variant="contained" color="primary"  onClick={()=> makeComment(result._id)} >
                            Post
                          </Button>
                        </div>                        
                   </CardActions> ):null} 
                   
               </Card>
                     
            </Grid>)
           })}
       </Grid>
        {console.log(count)}
        <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thank You for doing a post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Please kindly wait for the Admin approval. As soon as your post gets verified, It will be on the air.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>handleRoute('status')} color="primary" autoFocus>
            Check Status
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
      <Dialog
        open={opened}
        onClose={handleClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
        <DialogTitle id="alert-dialog-title">{"Please,Choose your file at first!"}</DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
       </>
   )
};

export default Post;