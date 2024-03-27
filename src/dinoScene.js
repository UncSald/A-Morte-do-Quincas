class DinoScene extends Phaser.Scene {   

    create() {
        
        
        this.gameClock = 0;
        this.gameActive = true;
        this.score = 0;

        // Create an audio object and play it
        this.audio = this.sound.add('myAudio');
        this.audio.play();

        this.gameSpeed = 6;
        const { height, width } = this.game.config;

        this.keys = this.input.keyboard.createCursorKeys();

        //Background
        this.sunset = this.physics.add.sprite(0, 0, 'sunset').setOrigin(0, 0);
        this.farcity = this.add.tileSprite(0, height - 80, width, 128, 'farcity').setOrigin(0, 1);
        this.city = this.add.tileSprite(0, height-80, width, 96, 'city').setOrigin(0, 1);
        

        //score
        

        //GG
        this.gameOverScreen = this.add.container(width / 2, height / 2 - 50).setAlpha(0)
        this.gameOverText = this.add.image(0, 0, 'game-over');
        this.restart = this.add.image(0, 80, 'restart').setInteractive();
        this.gameOverScreen.add([
        this.gameOverText,  this.restart
        ])


        //Ground
        this.ground = this.add.tileSprite(0, height-50, width, 30, 'ground').setOrigin(0, 1);
        
        this.physics.add.existing(this.ground, true);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;


        //Glow when reaching city
        this.glow = this.physics.add.sprite(width, height - 110, 'glow')
        .setOrigin(1, 0.5)
        .setAlpha(0);


        //Player
        this.player = this.physics.add.sprite(10, height-90, 'runner')
            .setOrigin(0, 1)
            .setCollideWorldBounds(true)
            .setGravityY(650)
            

            
        //Animations

            this.anims.create({
                key: 'running',
                frames: this.anims.generateFrameNumbers('runner', { start: 0, end: 3 }),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
                key: 'jumping',
                frames: this.anims.generateFrameNumbers('runner', { start: 0, end: 0 }),
                frameRate: 6,
                repeat: -1
            });

            this.anims.create({
            key: 'lizardRun',
            frames: this.anims.generateFrameNumbers('lizard', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
            })

            this.anims.create({
            key: 'crawl',
            frames: this.anims.generateFrameNumbers('homie', {start: 0, end: 3}),
            frameRate: 4,
            repeat: -1
            })

            this.anims.create({
                key: 'sunset',
                frames: this.anims.generateFrameNumbers('sunset', {start: 0, end: 1}),
                frameRate: 9,
                repeat: -1
            })

            this.anims.create({
                key: 'glow',
                frames: this.anims.generateFrameNumbers('glow', {start: 0, end: 1}),
                frameRate: 6,
                repeat: -1
            })

        this.player.anims.play('running');
        this.sunset.anims.play('sunset');
        this.glow.anims.play('glow');


        
        // Collider
        
        this.ground.body.position.y = height - 75;
        
        
        //Restart-button

        this.restart.on('pointerup', (pointer) => {
            this.gameActive = true;
            this.gameClock = 0;
            this.player.y = height - 90;
            this.gameOverScreen.setAlpha(0);
            this.physics.resume();
            this.anims.resumeAll();
            this.score = 0;
            this.obsticles.getChildren().forEach(obsticle => {
            
                this.obsticles.killAndHide(obsticle);
                obsticle.destroy();
            
            })
        })
    

        // Button
        const button = this.add.sprite(width - 70, height - 25, 'button-image');
        button.setInteractive();

        button.on('pointerdown', (pointer) => {
            if (this.player.body.velocity.y == 0) {
                this.player.setVelocityY(-400);
                this.player.anims.play('jumping');
            }
        });



        // Mute button
        const muteButton = this.add.sprite(50, 50, 'muteButton')
        .setInteractive();
        

        
        muteButton.on('pointerup', function () {
        
        if (this.sound.mute) {
            this.sound.mute = false;
            muteButton.setTexture('muteButton');
        } else {
            this.sound.mute = true;
            muteButton.setTexture('soundButton');
        }
        }, this);

        

        this.obsticles = this.physics.add.group();
                        
    
    }

    placeObsticle() {
        const obsticleNum = Math.floor(Math.random() * 7) + 1;
        const distance = Phaser.Math.Between(60, 190);

        let obsticle;
        if (obsticleNum > 4) {
        
        obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 75, `lizard`)
            .setOrigin(0, 1)
            obsticle.play('lizardRun', 1);
        obsticle.body.height = obsticle.body.height;
        } else {
        
        obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 75, `homie`)
            .setOrigin(0, 1)
            obsticle.play('crawl', 1);
        obsticle.body.height = obsticle.body.height;
        } 

        obsticle.setImmovable();
    }

    update(time, delta){
        this.frameTime += delta;

        if (this.frameTime > 16.5) {  
            this.frameTime = 0;
            g.gameTick++;
            // Code that relies on a consistent 60hz update
        }

        
        
        if (this.gameActive){
            Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
            this.ground.tilePositionX += this.gameSpeed;
            this.farcity.tilePositionX += this.gameSpeed * 0.3;
            this.city.tilePositionX += this.gameSpeed * 0.7;
            this.gameSpeed += 0.0001;
            this.score += 1/60;
            this.gameClock += delta * this.gameSpeed * 0.08;
            if (this.gameClock >= 1500) {
            this.placeObsticle();
            this.gameClock = 0;
            }
           
        }
        


        
        this.physics.add.collider(this.player, this.ground, () => {
            
        }, null, this);

        this.physics.add.collider(this.player, this.obsticles, () => {
            this.physics.pause();
            this.anims.pauseAll();
            this.gameOverScreen.setAlpha(1);
            
            this.gameActive = false;
           

        }, null, this);

        

        if (this.player.body.velocity.y == 0) {
            this.player.anims.play('running', true);
        }
        
        

        this.obsticles.getChildren().forEach(obsticle => {
        if (obsticle.getBounds().right < 0) {
            this.obsticles.killAndHide(obsticle);
        }
        })

        if (this.score > 21) {
            this.gameActive = false;
            this.ground.tilePositionX = 0;
            this.city.tilePositionX = 0;
            this.player.x += 2;
            this.glow.setAlpha(1);
            

        }
        if (this.player.getBounds().right > 350) {
            this.audio.stop();
            this.audio.destroy();
            this.scene.start('bar');
        }

    }
};


