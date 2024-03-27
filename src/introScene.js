class InitialScene extends Phaser.Scene  {

    preload()
    {
        const width = 350;
        const height = 500;

        // Calculate position of loading screen
        const x = (this.cameras.main.width - width) / 2;
        const y = (this.cameras.main.height - height) / 2;

        // Display loading screen while loading assets
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(x, y, width, height);

        const loadingText = this.make.text({
        x: x + width / 2,
        y: y + height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
        x: x + width / 2,
        y: y + height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text({
        x: x + width / 2,
        y: y + height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
        });
        assetText.setOrigin(0.5, 0.5);

    
    
        this.load.path = 'assets/';
        this.load.spritesheet('quincas',
        'joaquim1.png',
        {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('hand', 'pour.png', {frameWidth: 225, frameHeight: 96});
        this.load.image('button-image', 'jump.png');
        this.load.image('red', 'redhouse.png');
        this.load.image('green', 'greenhouse.png');
        this.load.image('blue', 'bluehouse.png');
        this.load.image('purple', 'purplehouse.png');
        this.load.image('door', 'door.png');
        this.load.image('bar', 'barBG.png');
        this.load.image('body', 'quincas-body.png');
        this.load.image('hitbox', 'hitbox.png');
        this.load.image('gole', 'da-lhe.png');
        this.load.image('beber', 'beber.png');
        this.load.image('pull', 'pull.png');
        this.load.image('onde', 'onde.png');
        this.load.image('katu', 'katu.png');
        this.load.image('pub', 'nao_e.png');
        this.load.image('text1', 'text1.png');


        //spritesheets
        this.load.spritesheet('runner', 'runner.png',
        {frameWidth: 93, frameHeight: 72});

        this.load.spritesheet('lizard', 'lizard.png',
        {frameWidth: 64, frameHeight: 32});

        this.load.image('ground', 'ground2.png');

        this.load.spritesheet('homie', 'homeless.png',
        {frameWidth: 64, frameHeight: 32});
        
        this.load.spritesheet('sunset', 'sunset.png',
        {frameWidth: 350, frameHeight: 450});

        this.load.image('city', 'citybg.png');
        this.load.image('farcity', 'farcitybg.png');
        this.load.image('game-over', 'gameover.png');
        this.load.image('restart', 'restart.png');
        this.load.spritesheet('glow', 'glow.png',
        {frameWidth: 64, frameHeight: 96});

        //deepSea
        this.load.image('deepSea', 'deepOcean.png')
        this.load.image('quincasSea', 'quincasSea.png')
        this.load.spritesheet('bubbles', 'bubbles.png',
        {frameWidth: 56, frameHeight: 60})


        // audio source: "https://pixabay.com/music/samba-latin-carnival-in-bahia-samba-112197/"
        this.load.audio('myAudio', 'carnival.mp3');
        // "https://quicksounds.com/sound/610/bar-fight-crowd"
        this.load.audio('barFight', 'BarFight.mp3');    
        // "https://pixabay.com/music/mystery-dramatic-atmosphere-with-piano-and-violin-143149/""
        this.load.audio('Sink', 'quincasSink.mp3');
        // "https://pixabay.com/sound-effects/ambience-night-field-cricket-01-7015/"
        this.load.audio('cricket', 'ambience.mp3');
        
        
        //Buttons load
        this.load.image('muteButton', 'mute.png');
        this.load.image('soundButton', 'sound.png');
        this.load.image('button-image', 'jump.png');
        this.load.image('up-button', 'up-button.png');
        this.load.image('down-button', 'down-button.png');
        this.load.image('left-button', 'left-button.png');
        this.load.image('right-button', 'right-button.png');
        this.load.image('button', 'entra.png');
        this.load.image('start', 'comece.png');
        }

    create()
    {

        const { height, width } = this.game.config;

        
        // Button
        const button = this.add.sprite(width/2, height - 50, 'start');

        // make the button interactive
        button.setInteractive();

        // add an input event listener to the button
        button.on('pointerup', (pointer) => {
        if (pointer.x > button.x - button.width / 2 && pointer.x < button.x + button.width / 2 &&
            pointer.y > button.y - button.height / 2 && pointer.y < button.y + button.height / 2) {
            this.scene.start('dino');
        }
        });



        //Player
        this.player = this.physics.add.sprite( width/2, height/2,'quincas').setScale(2);;
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('quincas', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'quincas', frame: 1 } ],
            frameRate: 20
        });

        

        this.player.anims.play('turn');

        //Text on title-screen

        let title = this.add.text(width / 2, height / 4, 'A ultima adventura do Quincas', {
            font: '24px Arial',
            fill: '#ffffff'
        });
        title.setOrigin(0.5, 1);

        let text = this.add.text(width /2, height - 90, 'Prima o botao para jogar', {
            font: '12px Arial',
            fill: '#ffffff'
        });
        text.setOrigin(0.5, 0.5);


    }

    update()
    {
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 1000)) {
            this.scene.start('dino');
        }
    }
};