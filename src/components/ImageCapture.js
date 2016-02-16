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

  saveImage: function() {
    var url = this.refs.webcam.getScreenshot();
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.jpg';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  },

  uploadImage: function() {
    var formData = new FormData();
    formData.append("image.jpg", this.dataURItoBlob(this.refs.webcam.getScreenshot()));
    var xhr = new XMLHttpRequest();
    var url = "/api/banana";
    xhr.open('POST', url, true);
    xhr.onload = function(e) {
      console.log('Uploaded File');
    };
    xhr.send(formData);
  },

  dataURItoBlob: function(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  },

  render: function() {
    return (
      <div className="VideoCapture">
        {/*<h1>Image Capture</h1>*/}
        <div className="capture_buttons" >
          <a onClick={this.takePicture} className="image record"></a>
        </div>
        <div className="capture" >
          <Webcam
            ref="webcam"
            audio={true}
            height="435"
            width="580"
            screenshotFormat="image/png"
            className="webcam_video"
            onUserMedia={this.onUserMedia}
          />
        { this.state.screenshot ? <img className="media_preview" src={this.state.screenshot} /> : null }
        </div>
        <div className="capture_buttons" >
          <button onClick={this.saveImage}>Save</button>
          <button onClick={this.uploadImage}>Upload</button>
        </div>
      </div>
    )
  }
});

module.exports = ImageCapture;
