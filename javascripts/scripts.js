/* for cctv */
const cctv = document.getElementById('section2-screen-cctv');
if (cctv) {
    cctv.addEventListener('click', () => {
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        cctv.className = `section2-screen-cctv-base section2-screen-cctv-image-${randomNumber}`;
    });
}
/* for lamps */
var colorButtons = document.querySelectorAll('.section2-group-buttons img');
colorButtons.forEach(function (btn) {
    var offSrc = btn.src;
    var onSrc = offSrc.replace('Off.svg', 'On.svg');

    btn.addEventListener('mouseenter', function () {
        btn.src = onSrc;
    });
    btn.addEventListener('mouseleave', function () {
        btn.src = offSrc;
    });
});
var lampOn = document.querySelector('.section2-lamp-icons div:first-child');
var lampOff = document.querySelector('.section2-lamp-icons div:last-child');
var cctvScreen = document.getElementById('section2-screen-cctv');

if (lampOn && lampOff && cctvScreen) {
    lampOff.addEventListener('click', function () {
        cctvScreen.className = 'section2-screen-cctv-base';
        cctvScreen.style.background = '#000';
    });
    lampOn.addEventListener('click', function () {
        cctvScreen.style.background = '';
        var randomNumber = Math.floor(Math.random() * 4) + 1;
        cctvScreen.className = 'section2-screen-cctv-base section2-screen-cctv-image-' + randomNumber;
    });
}

/* for cd spinning*/
const cdDisk = document.querySelector('.cd-disk');
if (cdDisk) {
    cdDisk.addEventListener('click', () => {
        cdDisk.classList.toggle('spinning');
    });
}
/* music*/
var music = new Audio('/sounds/sound.mp3');

var btnSoundOn = document.querySelector('.btn-sound-on');
if (btnSoundOn) {
    btnSoundOn.addEventListener('click', function () {
        music.play();
    });
}

var btnSoundOff = document.querySelector('.btn-sound-off');
if (btnSoundOff) {
    btnSoundOff.addEventListener('click', function () {
        music.pause();
        music.currentTime = 0;
    });
}
/* for running line controller */

var track = document.querySelector('.wave-ruler'); /* TKTK */
const thumb = document.getElementById('sliderButton');
const spectrograms = document.querySelectorAll('.spectrogram-img');

const stages = [
    { pos: '0%', img: '/images/section4/spectrogramGreen.svg' },
    { pos: '48%', img: '/images/section4/spectrogramYellow.svg' },
    { pos: '96%', img: '/images/section4/spectrogramRed.svg' },
];

if (track) {
    track.addEventListener('click', function (e) {
        var rect = track.getBoundingClientRect();
        var clickX = e.clientX - rect.left;
        var ratio = clickX / rect.width;

        var stage;
        if (ratio < 0.33) stage = stages[0];
        else if (ratio < 0.66) stage = stages[1];
        else stage = stages[2];

        spectrograms.forEach(function (img) { img.src = stage.img; });
        thumb.style.marginLeft = clickX + 'px'; /* TKTK */
    });
}



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

/* for radar coordinates and sweep */
var radarX = document.getElementById('section5-radar-number1');
var radarY = document.getElementById('section5-radar-number2');
var radarSweep = document.querySelector('.section5-radar-sweep');
var radarEl = document.querySelector('.section5-radar');

if (radarX && radarY && radarSweep && radarEl) {
    document.addEventListener('mousemove', function (e) {
        radarX.textContent = 'X:' + String(Math.floor(e.clientX)).padStart(4, '0');
        radarY.textContent = 'Y:' + String(Math.floor(e.clientY)).padStart(4, '0');

        var rect = radarEl.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
        radarSweep.style.transform = 'rotate(' + angle + 'deg)';
    });
}

/* for LED indicators random update */
var ledImg = document.querySelector('.section5-led-display img');
var ledSources = [
    '/images/section5/groupButtonsRed.svg',
    '/images/section5/groupButtonsGreen.svg'
];

if (ledImg) {
    setInterval(function () {
        var randomIndex = Math.floor(Math.random() * 2);
        ledImg.src = ledSources[randomIndex];
    }, 1000);
}

/* for progress bar */
var progressBar = document.querySelector('.section5-progress-bar');
if (progressBar) {
    progressBar.addEventListener('click', function () {
        progressBar.classList.remove('active');
        void progressBar.offsetWidth;
        progressBar.classList.add('active');
    });
}
/* for puzzle */

function dragAndDropPuzzle() {
    var puzzles = document.querySelectorAll('.puzzle')
    var drops = document.querySelectorAll('.puzzle-drop div')
    var btn = document.querySelector('.drop-play-button')
    var cnt = 0
    var draggedClass = null

    function handleDrop(puzzleClass) {
        var dropClass = puzzleClass.replace('puzzle', 'drop')
        var drop = document.querySelector('.' + dropClass)
        var drag = document.querySelector('.' + puzzleClass)
        if (!drop || !drag) return
        drop.classList.add('image')
        drag.style.display = 'none'
        cnt++
        if (cnt == 6) {
            btn.style.display = 'block'
        }
    }

    /* desktop drag */
    puzzles.forEach(function (p) {
        p.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.classList[1])
        })
    })
    drops.forEach(function (container) {
        container.addEventListener('dragover', function (e) { e.preventDefault() })
        container.addEventListener('drop', function (e) {
            e.preventDefault()
            handleDrop(e.dataTransfer.getData('text/plain'))
        })
    })

    /* touch support */
    puzzles.forEach(function (p) {
        p.addEventListener('touchstart', function (e) {
            draggedClass = e.target.classList[1]
        })
        p.addEventListener('touchmove', function (e) {
            e.preventDefault()
            var touch = e.touches[0]
            p.style.position = 'fixed'
            p.style.zIndex = '9999'
            p.style.left = (touch.clientX - p.offsetWidth / 2) + 'px'
            p.style.top = (touch.clientY - p.offsetHeight / 2) + 'px'
        }, { passive: false })
        p.addEventListener('touchend', function (e) {
            p.style.position = ''
            p.style.zIndex = ''
            p.style.left = ''
            p.style.top = ''
            if (!draggedClass) return
            var touch = e.changedTouches[0]
            var el = document.elementFromPoint(touch.clientX, touch.clientY)
            if (el && el.closest('.puzzle-drop')) {
                handleDrop(draggedClass)
            }
            draggedClass = null
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