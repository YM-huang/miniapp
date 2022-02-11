// API-DEMO page/component/video/video.js
Page({
  data: {
       status: "inited",
    time: "0",
    video: {
      src: "XNDM0OTQzMDc2OA==",
      showAllControls: false,
      showPlayButton: false,
      showCenterButton: true,
      showFullScreenButton: true,
      isLooping: false,
      muteWhenPlaying: false,
      initTime: 0,
      objectFit: "contain",
      autoPlay: false,
      directionWhenFullScreen: 90,
      mobilenetHintType: 2,
    },
  },

    onPlay(e) {
    console.log('onPlay');
  },

  onPause(e) {
    console.log('onPause');
  },

  onEnded(e) {
    console.log('onEnded');
  },

  onPlayError(e) {
    console.log('onPlayError, e=' + JSON.stringify(e));
  },

  onTimeUpdate(e) {
    console.log('onTimeUpdate:', e.detail.currentTime);
  },  
});
