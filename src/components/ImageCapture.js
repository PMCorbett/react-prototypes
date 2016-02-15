import React from "react";
import Webcam from './Webcam';


var ImageCapture = React.createClass({

  getInitialState: function() {
    return {
      screenshot: null
    };
  },

  takePicture: function() {
    var screenshot = this.refs.webcam.getScreenshot();
    this.setState({screenshot: screenshot});
  },

  onUserMedia: function() {
    //Do nothing
  },

  render: function() {
    return (
      <div className="VideoCapture">
        <h1>Image Capture</h1>
        <div className="capture" >
          <Webcam
            ref="webcam"
            audio={true}
            height="450"
            width="600"
            screenshotFormat="image/png"
            className="webcam_video"
            onUserMedia={this.onUserMedia}
          />
        { this.state.screenshot ? <img className="media_preview" src={this.state.screenshot} /> : null }
        </div>
        <div className="capture_buttons" >
          <button onClick={this.takePicture}>Take Picture</button>
        </div>
      </div>
    )
  }
});

module.exports = ImageCapture;
