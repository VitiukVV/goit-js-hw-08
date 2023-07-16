import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const playerCurrentTime = 'videoplayer-current-time';

player.on('timeupdate', throttle(onSaveTime, 1000));

function onSaveTime({ seconds }) {
  const currentTime = seconds;
  localStorage.setItem(playerCurrentTime, currentTime);
}

const saveCurrentTime = localStorage.getItem(playerCurrentTime);

player
  .setCurrentTime(saveCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
