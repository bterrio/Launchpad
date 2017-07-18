var SoundTimer = function (filePath, frequency, probability, volume) {
  this.filePath = filePath || null;
  this.frequency = frequency || 2000;
  this.probability = probability || 100;
  this.volume = volume || 50;

  this.timerId = 0;

  this.Start = function(playImmediately) {
    if (playImmediately) {
      this.Tick();
    } else {
      //wait before the first tick
      this.timerId = setTimeout(() => { this.Tick(); }, this.frequency * 1000);
    }
  };

  this.Tick = function() {
    if (this.probability >= Math.random() * 100) {
      let audio = new Audio(this.filePath);
      audio.volume = this.volume / 100;
      audio.play();
    }

    this.timerId = setTimeout(() => { this.Tick(); }, this.frequency * 1000);
  }

  this.Stop = function() {
    clearTimeout(this.timerId);
  };
};

module.exports = SoundTimer;
