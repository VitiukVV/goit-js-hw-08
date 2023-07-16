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

player.setCurrentTime(saveCurrentTime).then(function (playerCurrentTime) {});
