/* for cctv */

const cctv = document.getElementById('screen-cctv');
cctv.addEventListener('click', () => {
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    console.log(randomNumber);
    cctv.className = `screen-cctv-base screen-cctv-image-${randomNumber}`;
});

/* for running line controller */

const track = document.getElementById('sliderTrack');
const thumb = document.getElementById('sliderButton');
const spectrograms = document.querySelectorAll('.spectrogram-img');

console.log('track:', track);
console.log('thumb:', thumb);
console.log('spectrograms:', spectrograms);

const stages = [
    { pos: '0%', img: '/images/section4/spectrogramGreen.svg' },
    { pos: '48%', img: '/images/section4/spectrogramYellow.svg' },
    { pos: '96%', img: '/images/section4/spectrogramRed.svg' },
];

track.addEventListener('click', (e) => {
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;

    console.log('clicked! ratio:', ratio);

    let stage;
    if (ratio < 0.33) stage = stages[0];
    else if (ratio < 0.66) stage = stages[1];
    else stage = stages[2];

    console.log('stage:', stage);

    thumb.style.left = stage.pos;
    spectrograms.forEach(img => img.src = stage.img);
});