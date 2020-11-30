import React from "react";

import Phaser from "phaser"

import Ground from "../../assets/ground.png"
import Flag from "../../assets/flag.png"
import Background from "../../assets/background.png"
import Ring from "../../assets/ring.png"

import Phase1 from "../../constants/phase1";

class Scene extends Phaser.Scene {

    constructor(props) {
        super(props);

        this.lastMeasure = 0
    }

    submitQueue(queue) {
        console.log(queue)
        this.queue = queue
    }

    preload() {
        this.load.spritesheet(
            "character",
            "https://phaser.io/content/tutorials/making-your-first-phaser-3-game/dude.png",
            {frameWidth: 32, frameHeight: 48})

        this.textures.addBase64("ground", Ground)
        this.textures.addBase64("background", Background)
        this.textures.addBase64("flag", Flag)
        this.textures.addBase64("ring", Ring)
    }

    create() {
        const width = this.game.config.width

        this.add.image(0, 0, "background")
            .setOrigin(0, 0)
            .setDisplaySize(width, this.game.config.height)

        const blockSize = width / Phase1.length
        this.distance = blockSize
        this.actionOffset = 40
        this.platforms = this.physics.add.staticGroup();

        for (let line = 0; line < Phase1.length; line++) {
            for (let column = 0; column < Phase1[line].length; column++) {
                if (Phase1[line][column] === 1) {
                    this.platforms
                        .create( blockSize * column, blockSize*line, "ground")
                        .setOrigin(0,0)
                        .setDisplaySize(blockSize, blockSize)
                        .refreshBody()
                } else if (Phase1[line][column] === 2) {
                    this.platforms
                        .create( blockSize * column, blockSize*line, "ground")
                        .setOrigin(0,0)
                        .setDisplaySize(blockSize, blockSize)
                        .refreshBody()

                    this.flag = this.
                    platforms.create(blockSize * column + (blockSize/2), blockSize * line - 75, "flag")
                        .setOrigin(0,0).refreshBody()
                } else if (Phase1[line][column] === 3) {
                    this.platforms
                        .create( blockSize * column, blockSize*line, "ground")
                        .setOrigin(0,0)
                        .setDisplaySize(blockSize, blockSize)
                        .refreshBody()

                    this.player = this.physics.add.sprite((blockSize * column) + (blockSize/2), blockSize*line - 200, "character")
                        .setScale(2)
                        .setBounce(0.2)
                        .setCollideWorldBounds(true)
                        .setGravityY(2000)

                } else if (Phase1[line][column] === 4) {
                    this.platforms
                      .create( blockSize * column, blockSize*line, "ground")
                      .setOrigin(0,0)
                      .setDisplaySize(blockSize, blockSize)
                      .refreshBody()

                    this.ring = this.
                    add.image(blockSize * column + (blockSize/2), blockSize * line - 40, "ring")
                }
            }
        }

        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.collider(this.player, this.flag, function() {console.log("a")}, function() {console.log("a")}, this)

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
    }

    update(time, delta) {
        super.update(time, delta);

        if (this.queue != null && this.queue.length > 0) {
            if (this.lastMeasure === 0) {
                this.currentActionName = this.queue[0].name
                this.lastMeasure = time
            }

            if (time - this.lastMeasure <= 1000) {

                switch (this.currentActionName) {
                    case "WALK":
                        this.walk(this.distance)
                        break;
                    case "JUMP":
                        this.jump()
                        break;
                }
            } else {
                this.currentActionName = null
                this.lastMeasure = 0
                this.queue.shift()
            }
        } else {
            this.stop()
       }
        // const cursors = this.input.keyboard.createCursorKeys();
        // if (cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-160);
        //
        //     this.player.anims.play('left', true);
        // }
        // else if (cursors.right.isDown)
        // {
        //     this.player.setVelocityX(160);
        //
        //     this.player.anims.play('right', true);
        // }
        // else
        // {
        //     this.player.setVelocityX(0);
        //
        //     this.player.anims.play('turn');
        // }
        //
        // if (cursors.up.isDown)
        // {
        //     this.player.setVelocityY(-300);
        // }
    }

    walk(velocity = 160) {
        this.player.setVelocityX(velocity);
        this.player.anims.play('right', true);
    }

    jump() {
        this.walk(this.distance * 2)
        this.player.setVelocityY(-100);
    }

    //
    stop() {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }
}

export default Scene
