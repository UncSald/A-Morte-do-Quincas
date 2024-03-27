class BarScene extends Phaser.Scene{

    create() {

        const { height, width } = this.game.config;

        this.ambience = this.sound.add('cricket');
        this.ambience.play();

        this.add.image(0, 0, 'katu').setOrigin(0, 0);

        this.red = this.physics.add.sprite( 25, 125, 'red').setOrigin(0, 1);
        this.green = this.physics.add.sprite( width - 25, 125, 'green').setOrigin(1, 1);
        this.blue = this.physics.add.sprite( 15, height-120, 'blue').setOrigin(0, 1);
        this.purple = this.physics.add.sprite( width - 15, height-120, 'purple').setOrigin(1, 1);

        this.door1 = this.physics.add.sprite( 73, 126, 'door').setOrigin(0, 1);
        this.door2 = this.physics.add.sprite(  width - 73, 126, 'door').setOrigin(1, 1);
        this.door3 = this.physics.add.sprite( 31, height-119, 'door').setOrigin(0, 1);
        this.door4 = this.physics.add.sprite( width - 47, height-119, 'door').setOrigin(1, 1);
         

        this.red.body.immovable = true;
        this.green.body.immovable = true;
        this.blue.body.immovable = true;
        this.purple.body.immovable = true;

        this.door1.body.immovable = true;
        this.door2.body.immovable = true;
        this.door3.body.immovable = true;
        this.door4.body.immovable = true;


        this.player = this.physics.add.sprite(150, 420, 'runner')
            .setOrigin(0, 1)
        this.player.setSize(this.player.width, this.player.height / 2);
        this.player.setOffset(0, this.player.height / 2);
        this.player.setCollideWorldBounds(true);

        this.pub = this.add.image(175, 70,'pub')
        .setAlpha(0);
        
            
            
        
        //Gamepad buttons
        let leftButton, rightButton, upButton, downButton, button;
        
        leftButton = this.add.sprite(75, 450, 'left-button').setInteractive();
        rightButton = this.add.sprite(125, 450, 'right-button').setInteractive();
        upButton = this.add.sprite(100, 425, 'up-button').setInteractive();
        downButton = this.add.sprite(100, 475, 'down-button').setInteractive();
        this.button = this.add.sprite(width - 70, height - 25, 'button')
            .setAlpha(0)
            .setInteractive();

    

        // Add event listeners for button press and release
        leftButton.on('pointerdown', () => {
            this.player.setVelocityX(-200);
            this.player.anims.play('running', true);
            this.pub.setAlpha(0);
        });

        leftButton.on('pointerup', () => {
            this.player.setVelocityX(0);
            this.player.anims.play('jumping', true);
        });

        rightButton.on('pointerdown', () => {
            this.player.setVelocityX(200);
            this.player.anims.play('running', true);
            this.pub.setAlpha(0);
            
        });

        rightButton.on('pointerup', () => {
            this.player.setVelocityX(0);
            this.player.anims.play('jumping', true);
        });

        upButton.on('pointerdown', () => {
            this.player.setVelocityY(-200);
            this.player.anims.play('running', true);
            this.pub.setAlpha(0);
        });

        upButton.on('pointerup', () => {
            this.player.setVelocityY(0);
            this.player.anims.play('jumping', true);
        });

        downButton.on('pointerdown', () => {
            this.player.setVelocityY(200);
            this.player.anims.play('running', true);
            this.pub.setAlpha(0);
        });

        downButton.on('pointerup', () => {
            this.player.setVelocityY(0);
            this.player.anims.play('jumping', true);
        });
        
        this.buttonDown = false;
        this.button.on('pointerdown', () => {
            this.buttonDown = true;
        });
        this.button.on('pointerup', () => {
            this.buttonDown = false;
        });

        this.atDoor = false;
        }
        
    update(){
        this.physics.add.collider(this.player, [this.red, this.blue, this.green, this.purple], () => {
        }, null, this);
        
        this.physics.add.collider(this.player, [this.door1], () => {
            this.button.setAlpha(1);
            this.atDoor = true;    
        }, null, this);

        this.physics.add.collider(this.player, [this.door2, this.door3, this.door4], () => {
            this.atDoor = false;
            this.pub.setAlpha(1);
            this.button.setAlpha(0);    
        }, null, this);

        if (this.atDoor && this.buttonDown){
            this.ambience.stop();
            this.ambience.destroy();
            this.scene.start('game');
            }
    }

};

