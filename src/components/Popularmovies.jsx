import { useState,useEffect } from "react";
import axios from "axios";
import { Card,  makeStyles, CardActionArea, CardMedia, CardContent, Typography,Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Data from "../Views/cars.json"
const useStyles = makeStyles((theme) =>({
    container:{
        marginBottom:theme.spacing(2),
        marginTop:theme.spacing(1),
        display:'flex',       
     },
     media:{
         
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
     setup:{
         width:450,
         marginTop:theme.spacing(10),
         marginLeft:theme.spacing(2),
         marginRight:theme.spacing(3)
     },
     text:{
         display:'flex',
         width:'100%',
         justifyContent:'center'
     },
     playing:{
         marginTop:theme.spacing(0.5),
         marginRight:theme.spacing(0.5),
     },
          numberoflines:{
          WebkitLineClamp:1
     },
}));
     
    


const MediaTv = () => {


   const classes = useStyles();

   const [loading,setLoading] =useState(false);





   useEffect(() => {
          
     
        
   }, [])



   return (
      <> 
    <Grid container spacing={2} className={classes.setup}>
        <div className={classes.text}>
            <div className={classes.playing}>
               <DriveEtaIcon/>
            </div>
            <div>
                <Typography gutterBottom variant="h5" >World's Best Cars</Typography>
            </div>
        
        </div>
        {(loading)? <h1 className={classes.setup}>  </h1> :Data.map(result => {
            return ( <Grid item md={12} xs={12} sm={12}>
            <Card className={classes.container} >
                <CardActionArea className={classes.poster}>
                    <CardMedia className={classes.media}
                    style={{height:10,width:250}}
                    image={result.image}
                    title = {result.original_title}
                     />                                  
                </CardActionArea>
                <CardActionArea >                   
                  <CardContent className={classes.numberoflines}>
                      <Typography gutterBottom variant="h6">{result.car}</Typography>
                  </CardContent>              
                </CardActionArea>
            </Card>
                     
            </Grid>)
        })}
          
        
    </Grid>
    </>
  )
}
export default MediaTv;