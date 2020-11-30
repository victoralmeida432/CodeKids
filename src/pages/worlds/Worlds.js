import React from "react";

import "./Worlds.css"
import Grid from "@material-ui/core/Grid";

import Arrow from "../../assets/arrow.png"
import Maze1 from '../../assets/maze1.svg'
import {Link, Route, Switch} from "react-router-dom";
import Toolbar from "../../components/Toolbar/Toolbar";

class Worlds extends React.Component {

  render() {
    return (
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignItems="center">
        <Toolbar/>

        <Grid item xs={12}>
          <p className="title">1. Primeira Aventura</p>
        </Grid>
        <Switch>
          <Route path="/worlds/:worldId">
            <LevelList/>
          </Route>
          <Route path="/worlds">
            <WorldSelector/>
          </Route>
        </Switch>
      </Grid>

    )
  }
}


const WorldSelector = (props) => {
  return (
    <Grid
      container
      direction="row"
      spacing={0}
      justify="center"
      alignItems="center">
      <Grid item xs className="text-align-center">
        <img src={Arrow}/>
      </Grid>
      <Grid item xs className="text-align-center">
        <Link to="/worlds/01">
          <img src={Maze1}/>
        </Link>
      </Grid>
      <Grid item xs className="text-align-center">
        <img src={Arrow} className="rotated"/>
      </Grid>
    </Grid>
  )
}

const LevelList = (props) => {
  return (
    <Grid
      container
      direction="row"
      spacing={3}
      justify="center"
      alignItems="center">
      {
        [...Array(16).keys()].map(level => (
            <Grid
              item
              xs={3}
              className="text-align-center">
             <Link to="/worlds/01/game" style={(level !== 0)?{pointerEvents: "none"}: {}}>
               <div
                 className="levelCard"
                 style={(level !== 0)? {backgroundColor: "#197248"} : {}}>
                 <p>{level + 1}</p>
               </div>
             </Link>
            </Grid>
          )
        )
      }
    </Grid>
  )
}

export default Worlds
