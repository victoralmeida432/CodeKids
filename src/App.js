import React from "react";

import './App.css';
import Grid from "@material-ui/core/Grid";

import playIcon from "./assets/play_icon.svg"

import {Container} from "@material-ui/core";

import ACTIONS from './constants/actions'

class App extends React.Component{
    constructor(props) {
        super(props);
        this.props = props
        this.state = {
            queue: []
        }

        this.addAction = this.addAction.bind(this)
    }

    addAction(action) {
        this.setState({queue: [...this.state.queue, action]})
    }

    render() {
        const {queue} = this.state

        return (
            <div className="App background">
                {this.props.children}
                <Grid container spacing={0}>
                    <Grid item xs={10}>
                        <Card>
                            <div style={{overflow: "scroll"}} className="menu justify-left">
                                {
                                    queue.map(step => (
                                        <img className="action-card menu" src={step.icon} />
                                    ))
                                }
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        <Card>
                            <div className="menu justify-center">
                                <img src={playIcon}/>
                            </div>
                        </Card>
                    </Grid>
                    <Container>
                        <Grid container spacing={2} alignItems="center">
                            {
                                ACTIONS.map(action => (
                                    <Grid item xs={3} >
                                        <img
                                            onClick={() => this.addAction(action)}
                                            className="action-card selector"
                                            src={action.icon} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
                </Grid>
            </div>
        );
    }
}

const Card = (props) => {
    return (
        <div className="card">
            {
                props.children
            }
        </div>
    )
}

export default App;
