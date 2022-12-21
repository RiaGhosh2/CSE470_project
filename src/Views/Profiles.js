import { Grid, makeStyles } from "@material-ui/core";
import Leftbar from "../components/Leftbar";
import Profile from '../components/Profile/profilesall';


const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("lg")]:{
             display: "none",
          }
      },
      up:{
         marginTop :theme.spacing(7),
         [theme.breakpoints.down("sm")]:{
            marginLeft: theme.spacing(1),
         }
     }

}))

const Detailpage = () => {
   const classes = useStyles();

   return (
      <div>
       
        <Grid container>
           <Grid item sm={2} >
           <Leftbar/>
           </Grid>
           <Grid item sm={7} md={10} xs={10} className={classes.up}>
              <Profile/>
           </Grid>
        </Grid>
       
      </div>
   )
};

export default Detailpage;