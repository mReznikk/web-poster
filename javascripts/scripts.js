/* for cctv */
const cctv = document.getElementById('section2-screen-cctv');
if (cctv) {
    cctv.addEventListener('click', () => {
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        cctv.className = `section2-screen-cctv-base section2-screen-cctv-image-${randomNumber}`;
    });
}
/* for cd spinning*/
const cdDisk = document.querySelector('.cd-disk');
if (cdDisk) {
    cdDisk.addEventListener('click', () => {
        cdDisk.classList.toggle('spinning');
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
/* for puzzle */

function dragAndDropPuzzle() {
    const puzzle = document.querySelectorAll('.puzzle')
    const drops = document.querySelectorAll('.puzzle-drop div')
    const btn = document.querySelector('.drop-play-button')
    let cnt = 0

    puzzle.forEach((puzzle) => {
        puzzle.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.classList[1])
        })
    })
    drops.forEach((container) => {
        container.addEventListener('dragover', (event) => {
            event.preventDefault()
        })
        container.addEventListener('drop', (event) => {
            event.preventDefault()
            const puzzleClass = event.dataTransfer.getData('text/plain')
            const dropClass = puzzleClass.replace('puzzle', 'drop')
            const drop = document.querySelector(`.${dropClass}`)
            const drag = document.querySelector(`.${puzzleClass}`)

            drop.classList.add('image')
            drag.style.display = 'none'
            cnt++

            if (cnt == 6) {
                btn.style.display = 'block'
            }
        })
    })
}

dragAndDropPuzzle();

const sprite = document.querySelector('.sprite-animation');
if (sprite) {
    const frames = [
        '/images/animframe1.svg',
        '/images/animFrame2.svg'
    ];
    let currentFrame = 0;

    setInterval(() => {
        currentFrame = currentFrame === 0 ? 1 : 0;
        sprite.style.backgroundImage = `url('${frames[currentFrame]}')`;
    }, 2000); // 2000ms = 2 seconds
}