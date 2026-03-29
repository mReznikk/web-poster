/* for cctv */
const cctv = document.getElementById('section2-screen-cctv');
if (cctv) {
    cctv.addEventListener('click', () => {
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        cctv.className = `section2-screen-cctv-base section2-screen-cctv-image-${randomNumber}`;
    });
}

/* for running line controller */
const track = document.getElementById('sliderTrack');
const thumb = document.getElementById('sliderButton');
const spectrograms = document.querySelectorAll('.spectrogram-img');

const stages = [
    { pos: '0%', img: '/images/section4/spectrogramGreen.svg' },
    { pos: '48%', img: '/images/section4/spectrogramYellow.svg' },
    { pos: '96%', img: '/images/section4/spectrogramRed.svg' },
];

if (track) {
    track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;

        let stage;
        if (ratio < 0.33) stage = stages[0];
        else if (ratio < 0.66) stage = stages[1];
        else stage = stages[2];

        spectrograms.forEach(img => img.src = stage.img);
    });
}

/* for progress bar */
const progressBar = document.querySelector('.section5-progress-bar');
if (progressBar) {
    progressBar.addEventListener('click', () => {
        progressBar.classList.remove('active');
        void progressBar.offsetWidth;
        progressBar.classList.add('active');
    });
}