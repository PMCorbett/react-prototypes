import React from "react";

import ImageCapture from "./ImageCapture";
import AudioCapture from "./AudioCapture";
import VideoCapture from "./VideoCapture";


var MediaSelector = React.createClass({

  getInitialState: function () {
    return {
      MediaComponent: AudioCapture,
      MediaRecorderSupport: true
    };
  },

  componentDidMount: function() {
    this.MediaRecorderSupport();
  },

  MediaRecorderSupport: function() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getUserMedia({audio:true, video:true}, (e) => {this.handleUserMedia(e);}, (e) => {this.handleUserMediaError(e);} );
  },

  handleUserMedia: function(stream) {
    var options;
    try {
      options = {mimeType: 'video/webm'};
      this.mediaRecorder = new MediaRecorder(stream, options);
      this.setState({MediaRecorderSupport: true})
    } catch (e0) {
      try {
        options = {mimeType: 'video/webm,codecs=vp9'};
        this.mediaRecorder = new MediaRecorder(stream, options);
        this.setState({MediaRecorderSupport: true})
      } catch (e1) {
        try {
          options = 'video/webm'; // Chrome 47
          this.mediaRecorder = new MediaRecorder(stream, options);
          this.setState({MediaRecorderSupport: true})
        } catch (e2) {
          this.setState({MediaRecorderSupport: false})
          return
        }
      }
    }
  },

  handleUserMediaError: function(e) {
    this.setState({MediaRecorderSupport: false})
  },

  SetMedia: function(MediaComponent) {
    this.setState({
      MediaComponent: MediaComponent
    });
  },

  render: function() {
    var MediaComponent = this.state.MediaComponent;
    return (
      <div>
        <div className="media_select" >
          <a onClick={this.SetMedia.bind(this, ImageCapture)} >
            <img src="assets/camera_forum.png" alt="Image Capture" /></a>
          <a onClick={this.SetMedia.bind(this, AudioCapture)} >
            <img src="assets/audio_forum.png" alt="Audio Capture" /></a>
          <a onClick={this.SetMedia.bind(this, VideoCapture)}  >
            <img src="assets/video_forum.png" alt="Video Capture" /></a>
        </div>
        <div className="media_item">
          <MediaComponent MediaRecorderSupport={this.state.MediaRecorderSupport}/>
        </div>
      </div>
    );
  }
});
module.exports = MediaSelector;
