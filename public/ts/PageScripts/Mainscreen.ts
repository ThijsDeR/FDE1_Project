let isPlaying = false;
const audio = new Audio('./audio/traffic_sound.mp3');
audio.volume = 0.1;

const muteBtn = document.querySelector('div.mute-button')!

muteBtn.addEventListener('click', () => {
  const toggled = muteBtn.classList.toggle('active');
  toggled ? audio.pause() : audio.play();
})
