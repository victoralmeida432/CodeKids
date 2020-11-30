import React from "react";

import './Game.css';

import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";

import playIcon from "../../assets/play_icon.svg"
import ACTIONS from '../../constants/actions'

import Phaser from "phaser";
import Scene from "../../components/game/Scene"
import Toolbar from "../../components/Toolbar/Toolbar";


class Game extends React.Component{
    constructor(props) {
        super(props);
        this.props = props

        this.scene = new Scene()

        this.config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: "game",
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
                width: 800,
                height: 800
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: this.scene
        };

        this.state = {
            queue: []
        }


        this.addAction = this.addAction.bind(this)
        this.submitQueue = this.submitQueue.bind(this)
    }

    addAction(action) {
        this.setState({queue: [...this.state.queue, action]})
    }

    submitQueue() {
        this.scene.submitQueue(this.state.queue)
    }

    componentDidMount() {
        const game = new Phaser.Game(this.config)
    }

    render() {
        const {queue} = this.state
        return (
            <div className="App background">
                <Toolbar/>
                <div id="game"/>
                <Grid container spacing={0}>
                    <Grid item xs={10}>
                        <Card>
                            <div style={{overflow: "scroll"}} className="menu justify-left">
                                {
                                    queue.map(step => (
                                        <img
                                            className="action-card menu"
                                            src={step.icon} />
                                    ))
                                }
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        <Card>
                            <div className="menu justify-center">
                                <img src={playIcon} onClick={()=>this.submitQueue()}/>
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

export default Game;
