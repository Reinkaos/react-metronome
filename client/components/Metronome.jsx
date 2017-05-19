import React from 'react';
import Toggle from './Toggle.jsx';
import Controls from './Controls.jsx';

export default class Metronome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tempo: 100,
      active: false
    }

    // The binding is required to make 'this' work in the callback.
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.click = this.click.bind(this);
    this.beatsInMilliseconds = this.beatsInMilliseconds.bind(this);
    this.updateTempo = this.updateTempo.bind(this);
    this.changeTempo = this.changeTempo.bind(this);

    this.audio = new AudioContext();
  }

  beatsInMilliseconds() {
   return 60000 / this.state.tempo;
  }

  updateTempo(amount) {
    const currentlyActive = this.state.active;

    if (currentlyActive) {
      this.stop();
    }

    this.setState({tempo: amount})

    if (currentlyActive) {
      this.start();
    }
  }

  changeTempo(event) {
    let amount = parseInt(event.target.value);
    this.updateTempo(amount);
  }

  start() {
    this.clickID = setInterval(
     () => this.click(), this.beatsInMilliseconds()
    );

    this.setState({ active: true });
  }

  stop() {
    clearInterval(this.clickID);
    this.setState({active: false});
  }

  click() {
    let oscillator = this.audio.createOscillator();

    oscillator.type = 'sine'
    oscillator.frequency.value = 440;

    oscillator.start(this.audio.currentTime);

    // Click in quavers, so that we have a gap between clicks
    oscillator.stop(this.audio.currentTime + 0.480)
    oscillator.connect(this.audio.destination);
  }

  render() {

    const start = <Toggle func={this.start} name='Start' />;
    const stop = <Toggle func={this.stop} name='Stop' />;

    return (
      <div className='metronome'>
        <span className='tempo'>
          { this.state.tempo }
          <span className='bpm'>BPM</span>
        </span>

        { !this.state.active && start }
        { this.state.active && stop }

        <Controls tempo={this.state.tempo} updateTempo={this.updateTempo} changeTempo={this.changeTempo} />

    </div>
    );
  }

}
