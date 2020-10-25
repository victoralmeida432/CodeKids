import React from "react";

import Phaser from "phaser"

import Ground from "../../assets/ground.png"
import Background from "../../assets/background.png"

import Phase1 from "../../constants/phase1";

class Scene extends Phaser.Scene {

    constructor(props) {
        super(props);
    }

    submitQueue(queue) {
        queue.forEach(
            task => {
                switch (task.name) {
                    case "WALK":
                }
            }
        )
    }

    preload() {
        this.load.spritesheet(
            "character",
            "https://phaser.io/content/tutorials/making-your-first-phaser-3-game/dude.png",
            {frameWidth: 32, frameHeight: 48})

        this.load.image("ground", Ground)
        this.load.image("background", "https://storage.googleapis.com/code_kids_assets/background.png")
    }

    create() {
        const width = this.game.config.width

        this.add.image(0, 0, "background")
            .setOrigin(0, 0)
            .setDisplaySize(width, this.game.config.height)

        const block_size = width / Phase1.length
        this.platforms = this.physics.add.staticGroup();
        for (let line = 0; line < Phase1.length; line++) {
            for (let column = 0; column < Phase1[line].length; column++) {
                if (Phase1[line][column] === 1) {
                    this.platforms
                        .create( block_size * column, block_size*line, "ground")
                        .setOrigin(0,0)
                        .setDisplaySize(block_size, block_size)
                        .refreshBody()
                }
            }
        }

        this.player = this.physics.add.sprite(100, 250, "character").setScale(2)
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(1000)

        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers("character", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: "character", frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers("character", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        const gameContainer = document.getElementById("game")
        const realHeight = gameContainer.getElementsByTagName("canvas")[0].style.height

        console.log(realHeight)
        gameContainer.style.height = realHeight

    }

    update(time, delta) {
        super.update(time, delta);

        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (cursors.up.isDown)
        {
            this.player.setVelocityY(-300);
        }
    }
}

export default Scene
