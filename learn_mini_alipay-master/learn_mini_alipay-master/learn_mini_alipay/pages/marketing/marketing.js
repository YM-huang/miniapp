Page({
  data: {},
  onLoad() {},
  onWheelDraw(){
    my.navigateTo({url:'../marketing/wheel-draw/wheel-draw'});
  },
  onFruitSlots(){
    my.navigateTo({url:'../marketing/fruit-slots/fruit-slots'});
  },
  onScratchCard(){
    my.navigateTo({url:'../marketing/scratch-card/scratch-card'});
  },
  onHitEggs(){
    my.navigateTo({url:'../marketing/hit-eggs/hit-eggs'});
  },
  onDiceRoller(){
    my.navigateTo({url:'../marketing/dice-roller/dice-roller'});
  },
  onFlipDraw(){
    my.navigateTo({url:'../marketing/flip-draw/flip-draw'});
  },
  onLock(){
    my.navigateTo({url:'../marketing/lock/lock'});
  },
});
