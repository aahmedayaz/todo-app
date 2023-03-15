// Varaibles
let addTaskBtn = document.getElementById('addTaskBtn');
let formArea = document.getElementsByClassName('form-area')
let blurryElements = document.querySelectorAll('body > div:not(.form-area)')
let resetTaskBtn = document.getElementById('resetTaskBtn')
let roller = 0;
console.log(roller);
// console.log(resetTaskBtn);


// Functions
let addTask = () => {
    roller = 1;
    // console.log(roller);
    formArea[0].style.display = 'block'
    blurryEffect();
}

let blurryEffect = () => {
    if(roller == 2){
        Array.from(blurryElements).forEach((element) => {
            element.style.filter = 'blur(0px)'
        })
    }
    else{
        Array.from(blurryElements).forEach((element) => {
            element.style.filter = 'blur(2px)'
        })
    }
}

let closePopup = () => {
    roller = 2;
    // console.log(roller);
    formArea[0].style.display = 'none'
    blurryEffect();
}

// Event Listeners

addTaskBtn.addEventListener('click' , addTask)
resetTaskBtn.addEventListener('click' , closePopup)