import React from "react";
import Webcam from './Webcam';
import MediaRecording from "./MediaRecording";
import FlashVideoRecording from "./FlashVideoRecording";

var VideoCapture = React.createClass({

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
      this.mediaRecording = new MediaRecording(true, true, "video/webm");
    }else {
      this.mediaRecording = new FlashVideoRecording();
    }
  },

  // handleUserMedia: function() {
  //   this.mediaRecording.handleUserMedia();
  // },

  onUserMedia: function() {
    //Do nothing
  },

  startVideo: function() {
    this.setState({recording: true});
    this.mediaRecording.start();
  },

  stopVideo: function() {
    this.setState({recording: false});
    this.mediaRecording.stop();
  },

  toggleRecording: function() {
    if (this.state.recording) {
      this.stopVideo();
    }else {
      this.startVideo();
    }
  },

  playVideo: function() {
    this.setState({src: this.mediaRecording.getSrc()});
  },

  saveVideo: function() {
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
      <div className="VideoCapture">
        {/*<h1>Video Capture</h1>*/}
        {/*<h1>{this.props.MediaRecorderSupport ? "Supports MediaRecorder" : "Not Supported"}</h1>*/}
        <div className="capture_buttons" >
          <a onClick={this.toggleRecording} className={this.state.recording ? "video record active" : "video record inactive"}></a>
        </div>
        <div className="capture" >
          <Webcam
            ref="webcam"
            audio={true}
            height="435"
            width="580"
            screenshotFormat="image/png"
            onUserMedia={this.onUserMedia}
            className="webcam_video"
          />
          <video
            ref="videoElement"
            className="media_preview"
            src={this.state.src}
            controls
          ></video>
        </div>
        <div className="capture_buttons" >
          <button onClick={this.playVideo}>Play</button>
          <button onClick={this.saveVideo}>Save</button>
          <button onClick={this.uploadFile}>Upload</button>
        </div>
      </div>
    )
  }
});

module.exports = VideoCapture;
