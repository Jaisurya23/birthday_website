const audioConfigs = {
  'index.html': 'music/birthday.mp3',
  'cake.html': 'music/birthday.mp3',
  'praise.html': 'music/love.mp3',
  'letter.html': 'music/love.mp3',
  'memories.html': 'music/love.mp3',
  'gift.html': 'music/love.mp3',
  'final.html': 'music/love.mp3',
  '': 'music/birthday.mp3'
};

const BGM = new Audio();
BGM.loop = true;

window.addEventListener('DOMContentLoaded', () => {
  let currentPage = window.location.pathname.split('/').pop() || 'index.html';
  let targetSrc = audioConfigs[currentPage];
  if(!targetSrc) return;
  
  BGM.src = targetSrc;
  
  let savedSrc = sessionStorage.getItem('bgm_src');
  let savedTime = sessionStorage.getItem('bgm_time');
  
  if(savedSrc === targetSrc && savedTime) {
    BGM.currentTime = parseFloat(savedTime);
  } else if (savedSrc && savedSrc !== targetSrc) {
    BGM.currentTime = 0;
  }
  
  let playPromise = BGM.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      document.addEventListener('click', () => {
        BGM.play();
      }, { once: true });
    });
  }
  
  setInterval(() => {
    sessionStorage.setItem('bgm_src', targetSrc);
    sessionStorage.setItem('bgm_time', BGM.currentTime);
  }, 300);
});
