import React, { Component } from "react";
import {PlayCircleFilled,PauseCircleFilled,LeftSquareFilled,RightSquareFilled} from '@ant-design/icons'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playRate: 1,
      isPlay: false,
      isMuted: false,
      volume: 100,
      allTime: 0,
      currentTime: 0,
    };
    this.handleRate=this.handleRate.bind(this);
  }

  componentDidMount() {

  }

   formatSecond(time) {
    const second = Math.floor(time % 60);
    let minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }


  onCanPlay = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.playAudio();
    this.setState({
      allTime: audio.duration,
    });

  };

  playAudio = () => {

    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.play();
    this.setState({
      isPlay: true,
    });

  };

  pauseAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.pause();
    this.setState({
      isPlay: false,
    });
  };

  onMuteAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      isMuted: !audio.muted,
    });
    audio.muted = !audio.muted;
  };

  changeTime = (e) => {
    const { value } = e.target;

    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      currentTime: value,
    });
    audio.currentTime = value;
    if (value === audio.duration) {
      this.setState({
        isPlay: false,
      });
    }
  };


  onTimeUpdate = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);

    this.setState({
      currentTime: audio.currentTime,
    });

    if (audio.currentTime === audio.duration) {
      this.setState({
        isPlay: false,
      });
    }
  };

  changeVolume = (e) => {
    const { value } = e.target;
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.volume = value / 100;

    this.setState({
      volume: value,
      isMuted: !value,
    });
  };


  handleRate = (event) => {
    let num=event.target.value;
    this.audioDom.playbackRate = num;
    this.setState({
      playRate: num,
    });
  };

  componentWillUpdate(){
   this.state.playRate=1;
  }

  render() {
    const { src, id } = this.props;

    const {
      isPlay,
      isMuted,
      volume,
      allTime,
      currentTime,
      rateList,
      playRate,
    } = this.state;

    return (
      <div style={{textAlign:'center'}}>
        <audio
          id={`audio${id}`}
          src={src}
          ref={(audio) => {
            this.audioDom = audio;
          }}
          preload={"auto"}
          onCanPlay={this.onCanPlay}
          onTimeUpdate={this.onTimeUpdate}>
          <track src={src} kind="captions" />
        </audio>

        {isPlay ? (
          <PauseCircleFilled style={{fontSize:'70px',padding:'10px',color: '#08c'}}  onClick={this.pauseAudio}/>
        ) : (
          <PlayCircleFilled  style={{fontSize:'70px',padding:'10px',color:'#08c'}}  onClick={this.playAudio}/>
        )}

        <div>

        </div>
        <div className='book-rate'>
          <label className='play-range'>RATE:{this.state.playRate}</label>
          <input
            id="rr"
            type="range"
            min="0" max="1"
            value={this.state.playRate}
            onChange={this.handleRate}
            step="0.25"/>
        </div>
      </div>
    );
  }
}

export default App;