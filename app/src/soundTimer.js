var SoundTimer = function (soundName, frequency, probability, volume) {
  this.soundName = soundName || null;
  this.frequency = frequency || 2000;
  this.probability = probability || 100;
  this.volume = volume || 50;

  this.timerId = 0;

  this.Start = function() {
    // wait before the first tick
    this.timerId = setTimeout(() => { this.Tick(); }, this.frequency * 1000);
  };

  this.Tick = function() {
    if (this.probability >= Math.random() * 100) {
      let audio = new Audio(require(`../assets/${this.soundName}.mp3`));
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
