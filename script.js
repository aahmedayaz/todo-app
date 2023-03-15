// Varaibles
let addTaskBtn = document.getElementById('addTaskBtn');
let formArea = document.getElementsByClassName('form-area')
let blurryElements = document.querySelectorAll('body > div:not(.form-area)')
let resetTaskBtn = document.getElementById('resetTaskBtn')
let confirmAddTaskBtn = document.getElementById('confirmAddTaskBtn')
let overlay = document.getElementsByClassName('overlay')
let listItems = document.getElementById('list-items')
let inputs = document.querySelectorAll('.form-inputs input')
let roller = 0;
let opening = 0;

let finalArray = [];
// console.log(inputs);

// Functions

let showTasks = () => {
    let sign;
    let status1;
    if(opening == 0){
        return 0;
    }
    else{
        listItems.innerHTML = `${
            finalArray.map((element) => {
                console.log(element);
                if(element.status == true){
                    sign = 'check';
                    status1 = ' &nbspCompleted';
                }
                else{
                    sign = 'xmark';
                    status1 = ' &nbspNot Completed'
                }
                return `
                <tr class="list-item" draggable="true">
                    <td>${element.task}</td>
                    <td>${element.category}</td>
                    <td>${element.deadline}</td>
                    <td><i class="fa-solid fa-${sign}" ></i>${status1}</td>
                    <td><i class="fa-sharp fa-solid fa-hammer"></i> &nbspUpdate</td>
                    <td><i class="fa-solid fa-trash"></i> &nbspDelete</td>
                </tr>
                `
            }).join("")
        }`
    }
}

let addTask = (e) => {
    e.preventDefault();
    roller = 1;
    // console.log(roller);
    document.body.style.overflow = 'hidden';
    formArea[0].style.display = 'block'
    formArea[0].style.position = 'fixed'
    overlay[0].style.display = 'block'
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
    overlay[0].style.display  = 'none'
    blurryEffect();
}

let confirmAddTask = (e) => {
    e.preventDefault()
    opening++;
    let taskName = document.getElementById('task-name').value
    let taskCategory = document.getElementById('task-category').value
    let taskDeadline = document.getElementById('task-deadline').value
    // For CheckBox
    let taskStatus = document.getElementById('task-status').checked
    // console.log(taskName , typeof taskName);
    // console.log(taskCategory , typeof taskCategory);
    // console.log(taskDeadline , typeof taskDeadline);
    // console.log(taskStatus , typeof taskStatus);

    let date = new Date(`${taskDeadline}`)
    var options = { day: 'numeric', month: 'short', year: 'numeric' };
    var formattedDate = date.toLocaleDateString('en-US', options);

    let object = {
        task : taskName ,
        category : taskCategory ,
        deadline : formattedDate ,
        status : taskStatus
    }
    
    finalArray.push(object)
    console.log(finalArray);

    showTasks();

    // Clear all Inputs on Clicking
    Array.from(inputs).forEach((input) => {
        input.value = ''
        // For Checkbox
        input.checked = ''
    })

    // Close Form After Clicking
    closePopup();
}

// Event Listeners

addTaskBtn.addEventListener('click' , addTask)
resetTaskBtn.addEventListener('click' , closePopup)
overlay[0].addEventListener('click' , closePopup)
confirmAddTaskBtn.addEventListener('click' , confirmAddTask)

// Init

showTasks();
