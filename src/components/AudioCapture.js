import React from "react";
import MediaRecording from "./MediaRecording";
import FlashAudioRecording from "./FlashAudioRecording";

var AudioCapture = React.createClass({

  propTypes: {
    MediaRecorderSupport: React.PropTypes.bool.isRequired,
  },

  mediaRecording: false,

  getInitialState: function() {
    return ({
      src: false,
      recording: false
    })
  },

  componentDidMount: function() {
    if (this.props.MediaRecorderSupport) {
      this.mediaRecording = new MediaRecording(true, false, "audio/webm");
    }else {
      this.mediaRecording = new FlashAudioRecording();
    }
  },

  componentDidSomethingElse: function() {
    this.mediaRecording.renderFlashObject();
  },

  startAudio: function() {
    this.setState({recording: true});
    this.mediaRecording.start();
  },

  stopAudio: function() {
    this.setState({recording: false});
    this.mediaRecording.stop();
  },

  toggleRecording: function() {
    if (this.state.recording) {
      this.stopAudio();
    }else {
      this.startAudio();
    }
  },

  playAudio: function() {
    this.setState({src: this.mediaRecording.getSrc()});
    var audioEl = this.refs.audioElement;
    audioEl.play()

  },

  saveAudio: function() {
    var blob = this.mediaRecording.getBlob();
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  },

  uploadFile: function() {
    this.mediaRecording.upload();
  },

  render: function() {
    return (
      <div className="AudioCapture">
        {/*<h1>Audio Capture</h1>*/}
        <div className="capture_buttons" >
          <a onClick={this.toggleRecording} className={this.state.recording ? "audio record active" : "audio record inactive"}></a>
        </div>
        <div ref="ello" className="capture" >
          <audio
            ref="audioElement"
            className="media_preview"
            src={this.state.src}
            controls
          ></audio>
        </div>
        <div className="capture_buttons" >
          <button onClick={this.playAudio}>Play</button>
          <button onClick={this.saveAudio}>Save</button>
          <button onClick={this.uploadFile}>Upload</button>
        </div>
      </div>
    )
  }
});

module.exports = AudioCapture;
