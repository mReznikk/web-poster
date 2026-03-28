const cctv = document.getElementById('screen-cctv');
cctv.addEventListener('click', () => {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    console.log(randomNumber);
    cctv.className = `screen-cctv-base screen-cctv-image-${randomNumber}`;
});