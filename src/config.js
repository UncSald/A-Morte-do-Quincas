var config = {
    type: Phaser.AUTO,
    
    width: 350,
    height: 500,
    backgroundColor: '#898e99',
    
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scale: {
        mode: Phaser.Scale.CENTER_BOTH
    },

    scene: {initial: introScene, 
    dino: dinoScene,
    bars: barScene,
    game: barGame,
    animation: animationScene
    }
    
};