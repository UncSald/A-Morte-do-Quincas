
class BarGame extends Phaser.Scene{

    create() {

        //define some things

        let leftButton, rightButton;
        this.hitbox1 = this.physics.add.sprite(0, 0, 'hitbox').setOrigin(0, 0);
        this.hitbox1.body.immovable = true;
        this.hitbox2 = this.physics.add.sprite(420, 0, 'hitbox').setOrigin(0, 0);
        this.hitbox2.body.immovable = true;
        
        // some sounds
        this.barSound = this.sound.add('barFight');
        this.barSound.loop = true;
        this.barSound.play();
        
        //draw background

        this.add.image(0, 0, 'bar')
        .setOrigin(0, 0)
        .setScale(1);

        

        //draw shouts

        this.shout1 = this.add.image(10, 100, 'gole')
        .setOrigin(0, 0)
        .setAlpha(1);

        this.shout2 = this.add.image(340, 300, 'beber')
        .setOrigin(1, 0)
        .setAlpha(0);

        this.shout3 = this.add.image(10, 300, 'onde')
        .setOrigin(0, 0)
        .setAlpha(0);

        //draw players

        this.bodyQ = this.physics.add.sprite(175, 160, 'body')
        .setOrigin(0.5, 0)
        .setScale(1);
        
        this.player = this.physics.add.sprite(175, 120, 'quincas')
            .setOrigin(0.5, 0.5)
            .setScale(1);

        this.hand = this.physics.add.sprite(190, 60, 'hand').setOrigin(0, 0);

        this.pull = this.physics.add.sprite(181, 500, 'pull')
        .setOrigin(0.5, 0);
        
        //draw buttons

        leftButton = this.add.sprite(100, 475, 'left-button').setInteractive();
        rightButton = this.add.sprite(250, 475, 'right-button').setInteractive();
        this.downButton = this.add.sprite(175, 475, 'down-button')
        .setAlpha(0)
        .setInteractive();
        
        //animations

        this.anims.create({
                key: 'pouring',
                frames: this.anims.generateFrameNumbers('hand', {start: 0, end: 1}),
                frameRate: 9,
                repeat: -1
            })
        this.hand.anims.play('pouring');


        //buttons
        leftButton.on('pointerdown', () => {
            this.hand.setVelocityX(-115);
        });

        rightButton.on('pointerdown', () => {
            this.hand.setVelocityX(115);
        });

        this.downButton.on('pointerdown', () => {
            this.pull.setVelocityY(-100);
            });

        // progress

        this.score = 0;
        this.progressWidth =0;

        this.graphics = this.add.graphics();

        this.graphics.strokeRect(174, 79, 100, 20);

        this.graphics.fillStyle = '#b99000';

    }

    update() {

        const bottleX = this.hand.x + (this.hand.width/10.227);
        
        this.physics.add.collider(this.hand, [this.hitbox1, this.hitbox2], () => {
            this.hand.setVelocityX(0);
        }, null, this);

        if (bottleX > 170 && bottleX < 180) {
            this.score += 0.4;
            this.progressWidth += 1;
            this.player.anims.play('down');
            
        } else{
            this.player.anims.play('turn');
            
        };
        
        if (this.pull.y < 375){
            this.pull.setVelocityY(220);
            this.bodyQ.setVelocityY(220);
            this.player.setVelocityY(220);
            this.shout2.setAlpha(0);
            this.shout3.setAlpha(1);
        }
        
        if (this.score > 100) {
            this.downButton.setAlpha(1);
            this.shout2.setAlpha(1);
            this.score = 100;
        }   
        else {
            this.progressBar = this.graphics.fillRect(124, 29, this.score, 20);
        };
        
        if(this.score>50){
            this.shout1.setAlpha(0);
        }

        if (this.player.y > 500) {
            this.barSound.stop();
            this.barSound.destroy();
            this.scene.start('animation');

        }

    }
};
