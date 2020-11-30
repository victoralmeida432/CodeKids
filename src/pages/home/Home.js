import React from "react";

import "./Home.css"

import Container from "@material-ui/core/Container";

import Logo from "../../assets/logo.svg"
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import PlayBtn from "../../assets/play_btn.svg"

class Home extends React.Component {

    render() {
        return (
            <Grid
                container
                alignItems="center"
                direction="column">
                <Grid item xs={12}>
                    <img src={Logo} className="logo"/>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/worlds">
                        <img src={PlayBtn}></img>
                    </Link>
                </Grid>
            </Grid>
        )
    }
}

export default Home
