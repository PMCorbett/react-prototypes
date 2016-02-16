var MediaRecording = class {

  constructor(audio, video, mimeType) {
    this.audio = audio;
    this.video = video;
    this.mimeType = mimeType;
    this.recordedChunks = Array();
    if (!this.hasGetUserMedia()) return;
    this.requestUserMedia();
  }

  hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  requestUserMedia() {
    var constraints = { audio: this.audio, video: this.video };
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getUserMedia(constraints, (e) => {this.handleUserMedia(e);}, (e) => {this.handleMediaError(e);});
  }

  handleMediaError(error) {
    if (error) {
      console.log(error);
      return;
    }
  }

  handleUserMedia(stream) {
    var options;
    try {
      options = {mimeType: this.mimeType};
      this.mediaRecorder = new MediaRecorder(stream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);
      try {
        options = {mimeType: this.mimeType + ',codecs=vp9'};
        this.mediaRecorder = new MediaRecorder(stream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);
        try {
          options = this.mimeType; // Chrome 47
          this.mediaRecorder = new MediaRecorder(stream, options);
        } catch (e2) {
          // alert('MediaRecorder is not supported by this browser.\n\n' +'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
          console.error('Exception while creating MediaRecorder:', e2);
          // Render Flash Fall Back :(
          return;
        }
      }
    }
    console.log('Successfully Created MediaRecorder');
    this.mediaRecorder.onstop = this.handleStop;
    this.mediaRecorder.ondataavailable = (e) => {this.handleDataAvailable(e);};
  }

  handleDataAvailable(event) {
    if (event.data.size > 0) {
      this.recordedChunks.push(event.data);
    }
  }

  handleStop(event) {
    console.log('Recorder stopped: ', event);
  }

  start() {
    this.mediaRecorder.start();
  }

  stop() {
    this.mediaRecorder.stop();
  }

  getSrc() {
    var superBuffer = new Blob(this.recordedChunks);
    return window.URL.createObjectURL(superBuffer);
  }

  getBlob() {
    return new Blob(this.recordedChunks, {type: this.mimeType});
  }

  upload() {
    var file = new File(this.recordedChunks, "video.webm");
    var formData = new FormData();
    formData.append(file.name, file);
    var xhr = new XMLHttpRequest();
    var url = "/api/banana";
    xhr.open('POST', url, true);
    xhr.onload = function(e) {
      console.log('Uploaded File');
    };
    xhr.send(formData);
  }

};

module.exports = MediaRecording;
