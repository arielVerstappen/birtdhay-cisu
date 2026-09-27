document.addEventListener('DOMContentLoaded', () => {
  const envelopeBtn = document.getElementById('envelope-btn');
  const envelopeScreen = document.getElementById('envelope-screen');
  const bloomOverlay = document.getElementById('bloom-overlay');
  const mainContent = document.getElementById('main-content');
  const widgetWrapper = document.getElementById('widget-wrapper');

  const openWidgetBtn = document.getElementById('open-widget-btn');
  const closeWidgetBtn = document.getElementById('close-widget-btn');
  const musicModal = document.getElementById('music-modal');

  // ALUR ANIMASI SAAT AMPLOP DIKLIK
  envelopeBtn.addEventListener('click', () => {
    // 1. Hilangkan amplop
    gsap.to(envelopeScreen, {
      duration: 0.4,
      opacity: 0,
      scale: 0.9,
      onComplete: () => envelopeScreen.classList.add('hidden')
    });

    // 2. Munculkan animasi bunga mekar & membesar berhamburan
    bloomOverlay.classList.remove('hidden');

    const tl = gsap.timeline();

    tl.to(bloomOverlay, {
      duration: 1.0,
      opacity: 1,
      scale: 1,
      ease: "power2.out"
    })
    .to(bloomOverlay, {
      duration: 1.2,
      scale: 2.2, // Bunga membesar memenuhi seluruh layar
      ease: "power1.inOut"
    })
    .to(bloomOverlay, {
      duration: 0.6,
      opacity: 0,
      onComplete: () => {
        bloomOverlay.classList.add('hidden');
      }
    });

    // 3. Tampilkan layar kaset & widget di kiri bawah
    setTimeout(() => {
      mainContent.classList.remove('hidden');
      widgetWrapper.classList.remove('hidden');

      gsap.fromTo(mainContent, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(widgetWrapper, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
    }, 1600);
  });

  // KONTROL MODAL YOUTUBE
  openWidgetBtn.addEventListener('click', () => {
    musicModal.classList.remove('hidden');
  });

  closeWidgetBtn.addEventListener('click', () => {
    musicModal.classList.add('hidden');
  });

  musicModal.addEventListener('click', (e) => {
    if (e.target === musicModal) {
      musicModal.classList.add('hidden');
    }
  });
});

function playTrack(trackNumber) {
  const trackNames = {
    1: 'Perfect - Ed Sheeran',
    2: 'All of Me - John Legend'
  };
  
  const currentSongElement = document.getElementById('current-song-name');
  if (currentSongElement) {
    currentSongElement.textContent = trackNames[trackNumber] || 'Playing';
  }
}