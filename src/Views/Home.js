import { Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Feed from "../components/feed";
import Leftbar from "../components/Leftbar";
import { withRouter } from "react-router-dom";
import MediaRight from '../components/mediaRight'


const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("sm")]:{
             display: "none",
          }
      }

}))




const Home = () => {
   const classes = useStyles();

   return (
      <div>
       
        <Grid container>
           <Grid item sm={2} >
           <Leftbar/>
           </Grid>
           <Grid item sm={7} xs={10}>
              <Feed/>
           </Grid>
           <Grid item sm={3} className={classes.right}>
            <MediaRight/>  
           </Grid>
        </Grid>
        <Add/>
        
      </div>
      
   )
};

export default withRouter(Home);