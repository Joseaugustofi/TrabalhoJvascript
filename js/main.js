const showPopup = document.querySelector('.nav-item');
const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.btn');
showPopup.onclick = () => {
    popupContainer.classList.add('active');
}
closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}