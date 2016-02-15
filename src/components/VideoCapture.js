import React from "react";
import Webcam from './Webcam';
import MediaRecording from "./MediaRecording";

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
    this.mediaRecording = new MediaRecording(true, true, "video/webm");
  },

  handleUserMedia: function() {
    this.mediaRecording.handleUserMedia();
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
    this.mediaRecording.save();
  },

  uploadFile: function() {
    this.mediaRecording.upload();
  },

  render: function() {
    return (
      <div className="VideoCapture">
        <h1>Video Capture</h1>
        <h1>{this.props.MediaRecorderSupport ? "Supports MediaRecorder" : "Not Supported"}</h1>
        <div className="capture_buttons" >
          <a onClick={this.toggleRecording} className={this.state.recording ? "video record active" : "video record inactive"}></a>
        </div>
        <div className="capture" >
          <Webcam
            ref="webcam"
            audio={true}
            height="450"
            width="600"
            screenshotFormat="image/png"
            onUserMedia={this.handleUserMedia}
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
