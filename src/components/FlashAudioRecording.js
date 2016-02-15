import Recorder from "./recorder";
import swfobject from "./swfobject";

var FlashAudioRecording = class {
  constructor() {
    this.Recorder = Recorder;
    window.fwr_event_handler = (e) => {this.setFWREvents(e);};
    var appWidth = 24;
    var appHeight = 24;
    var flashvars = {};
    var params = {};
    var attributes = {'id': "recorderApp", 'name': "recorderApp"};

    var flash_container = document.createElement('div');
    document.querySelector('.capture').appendChild(flash_container);
    swfobject.embedSWF("assets/recorder.swf", flash_container, appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);

  }

  setFWREvents() {
    console.log(arguments[0])
    var name, $controls;
    switch (arguments[0]) {
      case "ready":
        var width = parseInt(arguments[1]);
        var height = parseInt(arguments[2]);
        this.Recorder.uploadFormId = "#uploadForm";
        this.Recorder.uploadFieldName = "upload_file[filename]";
        this.Recorder.connect("recorderApp", 0);
        this.Recorder.recorderOriginalWidth = width;
        this.Recorder.recorderOriginalHeight = height;
        break;

      case "no_microphone_found":
        break;

      case "microphone_user_request":
        this.Recorder.showPermissionWindow();
        break;

      case "microphone_connected":
        this.Recorder.isReady = true;
        this.start();
        break;

      case "permission_panel_closed":
        this.Recorder.defaultSize();
        break;

      case "microphone_activity":
        break;

      case "recording":
        this.Recorder.hide();
        break;

      case "recording_stopped":
        this.Recorder.show();
        break;

      case "microphone_level":
        break;

      case "observing_level":
        break;

      case "observing_level_stopped":
        break;

      case "playing":
        break;

      case "playback_started":
        break;

      case "stopped":
        break;

      case "playing_paused":
        break;

      case "save_pressed":
        break;

      case "saving":
        break;

      case "saved":
        break;

      case "save_failed":
        break;

      case "save_progress":
        break;
    }
  }

  start() {
    this.Recorder.record('audio', 'audio.wav');
  }

  stop() {
    this.Recorder.stopRecording('audio');
  }

  getSrc() {
    this.Recorder.playBack('audio');
  }

  getBlob() {
    return this.Recorder.getBlob('audio');
  }

  upload() {

  }
};
module.exports = FlashAudioRecording;
