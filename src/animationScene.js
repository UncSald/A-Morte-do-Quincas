class AnimationScene extends Phaser.Scene{
            
    create() {

        this.Sink = this.sound.add('Sink');
        this.Sink.play();

        this.add.image(0, 0, 'deepSea')
        .setOrigin(0, 0);

        this.quincas = this.add.image(175, 250, 'quincasSea')
        .setOrigin(0.5, 0.5);

        this.bubble = this.physics.add.sprite(175, 100, 'bubbles').setOrigin(0.5, 0.5);

        this.anims.create({
                key: 'bubbly',
                frames: this.anims.generateFrameNumbers('bubbles', { start: 0, end: 1 }),
                frameRate: 7,
                repeat: -1
            });

        this.bubble.anims.play('bubbly');
        this.bubble.setVelocityY(-2);

        this.image = this.add.image(175, 250, 'text1').setAlpha(0);

        this.tweens.add({
        targets: this.image,
        alpha: 1,
        duration: 4000,
        ease: 'Power2',
        
        });

        this.tweens.add({
        targets: this.quincas,
        alpha: 0,
        duration: 10000,
        ease: 'Power2',
        
        });
        this.newClock = 0;
    }
    
    update() {
        
        this.newClock += 1

        if (this.newClock > 1000){
            this.Sink.stop();
            this.Sink.destroy();
            this.scene.start('initial');
        }
    }
};
