// Varaibles
let addTaskBtn = document.getElementById('addTaskBtn');
let updateTaskBtn = document.getElementById('updateTaskBtn');
let formArea = document.getElementsByClassName('form-area')
let form = document.getElementById('form')
let blurryElements = document.querySelectorAll('body > div:not(.form-area)')
let resetTaskBtn = document.getElementById('resetTaskBtn')
let confirmAddTaskBtn = document.getElementById('confirmAddTaskBtn')
let overlay = document.getElementsByClassName('overlay')
let listItems = document.getElementById('list-items')
let inputs = document.querySelectorAll('.form-inputs input')
let roller = 0;
let opening = 0;
let taskName = document.getElementById('task-name')
let taskCategory = document.getElementById('task-category')
let taskDeadline = document.getElementById('task-deadline')
let deleteBtn;
let indexValue;
// For CheckBox
let taskStatus = document.getElementById('task-status')
let importantContainer = document.getElementById('container')
let timing = document.getElementById('timing')

let finalArray = [];
let modifiedArray = []
let todayArray = []
let upcomingArray = []
// console.log(inputs);

// Functions

let showTasks = (arr) => {
    let sign;
    let status1;
    if(opening == 0){
        return 0;
    }
    else{
        arr.length > 0 ? listItems.innerHTML = `${ 
            arr.map((element , index) => {
                if(element.status == true){
                    sign = 'check';
                    status1 = ' &nbspCompleted';
                }
                else{
                    sign = 'xmark';
                    status1 = ' &nbspNot Completed'
                }
                return `
                <tr class="list-item" draggable="true" data-index = ${index}>
                <td>${element.task}</td>
                <td>${element.category}</td>
                <td>${element.deadline}</td>
                <td><i class="fa-solid fa-${sign}" ></i>${status1}</td>
                <td class='updateBtn'><i class="fa-sharp fa-solid fa-hammer"></i> &nbspUpdate</td>
                <td class='deleteBtn'><i class="fa-solid fa-trash"></i> &nbspDelete</td>
                </tr>
                `
            }).join("") 
        }` : listItems.innerHTML = `
            <tr>
                <td class="notFound" colspan="6" style="text-align: center; font-size: 25px;">No Task Found</td>
            </tr>
        `
        deleteBtn = Array.from(document.getElementsByClassName('deleteBtn'))
        deleteBtn.forEach((btn) => {
            btn.addEventListener('click' , deleteTask)
        })    
        updateBtn = Array.from(document.getElementsByClassName('updateBtn'))
        updateBtn.forEach((btn) => {
            btn.addEventListener('click' , updateTask)
        })    
    }
}

let deleteTask = (btn) => {
    finalArray.splice(btn.target.parentElement.getAttribute('data-index') , 1)
    showTasks(finalArray)
    modifiedArray = finalArray.sort((a , b) => {
        return new Date(a.deadline) - new Date(b.deadline)
    })
    upcomingDeadlines()
}

let updateTask = (btn) => {
    roller = 1;
    // console.log(roller);
    document.body.style.overflow = 'hidden';
    formArea[0].style.display = 'block'
    formArea[0].style.position = 'fixed'
    overlay[0].style.display = 'block'
    form.classList.add('update')
    form.classList.remove('add')
    blurryEffect();

    indexValue = btn.target.parentElement.getAttribute('data-index')
    taskName.value = btn.target.parentElement.children[0].innerText
    taskCategory.value = btn.target.parentElement.children[1].innerText
    console.log(btn.target.parentElement.children[2].innerText); // "Mar 21, 2023"
    // console.log(btn.target.parentElement.getAttribute('data-index'));
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
    // Validations when we click on Add Btn
    if(taskName.value == ''){
        taskName.classList.add('invalid')
    }
    if(taskCategory.value == ''){
        taskCategory.classList.add('invalid')
    }
    if(taskDeadline.value == ''){
        taskDeadline.classList.add('invalid')
    }
    opening++;
    // console.log(taskName , typeof taskName);
    // console.log(taskCategory , typeof taskCategory);
    // console.log(taskDeadline , typeof taskDeadline);
    // console.log(taskStatus , typeof taskStatus);
    
    let date = new Date(`${taskDeadline.value}`)
    var options = { day: 'numeric', month: 'short', year: 'numeric' };
    var formattedDate = date.toLocaleDateString('en-US', options);
    
    if(taskName.value != '' && taskCategory.value != '' && taskDeadline.value != ''){
        let object = {
            task : taskName.value ,
            category : taskCategory.value ,
            deadline : formattedDate ,
            status : taskStatus.checked
        }
        
        finalArray.push(object)
    
        showTasks(finalArray);
        modifiedArray = finalArray.sort((a , b) => {
            return new Date(a.deadline) - new Date(b.deadline)
        })
        upcomingDeadlines()
        
        // Clear all Inputs on Clicking
        Array.from(inputs).forEach((input) => {
            input.value = ''
            // For Checkbox
            input.checked = ''
        })
        
        // Close Form After Clicking
        closePopup();
        document.body.style.overflow = 'visible';
    }
}

let confirmUpdateTask = (e) => {
    e.preventDefault()
    // Validations when we click on Add Btn
    if(taskName.value == ''){
        taskName.classList.add('invalid')
    }
    if(taskCategory.value == ''){
        taskCategory.classList.add('invalid')
    }
    if(taskDeadline.value == ''){
        taskDeadline.classList.add('invalid')
    }

    let date = new Date(`${taskDeadline.value}`)
    var options = { day: 'numeric', month: 'short', year: 'numeric' };
    var formattedDate = date.toLocaleDateString('en-US', options);

    if(taskName.value != '' && taskCategory.value != '' && taskDeadline.value != ''){
        let object = {
            task : taskName.value ,
            category : taskCategory.value ,
            deadline : formattedDate ,
            status : taskStatus.checked
        }
        
        finalArray.splice(indexValue , 1 , object)
    
        showTasks(finalArray);
        modifiedArray = finalArray.sort((a , b) => {
            return new Date(a.deadline) - new Date(b.deadline)
        })
        upcomingDeadlines()

        // Clear all Inputs on Clicking
        Array.from(inputs).forEach((input) => {
            input.value = ''
            // For Checkbox
            input.checked = ''
        })
        
        // Close Form After Clicking
        closePopup();
        document.body.style.overflow = 'visible';
    }    
}

// Validations on Input tags
let checkInput = (e) => {
    if(e.target.value != ''){
        if(e.target.classList.contains('invalid')){
            e.target.classList.remove('invalid');
            e.target.classList.add('valid')
        }
    }
}


let upcomingDeadlines = () => {
    importantContainer.innerHTML = `${
        modifiedArray.map((element) => {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let dateObj = new Date(element.deadline);
            let month = monthNames[dateObj.getMonth()]; 
            let day = dateObj.getDate();
            if(element.status == false){
                return `
                <div class="important-list-item">
                    <div class="date-time">
                        <span class="date">${day}</span>
                        <span class="month">${month.slice(0 , 3)}</span>
                    </div>
                    <div class="title-deadline">
                        <p class="title">${element.task}</p>
                        <p class="deadline-timing">Category : ${element.category}</p>
                    </div>
                </div>
            `
            }
        }).join("")
    }`
}

let sortingTasks = (e) => {
    if(e.target.value == 'today'){
        let newArray = []
        newArray = finalArray.filter((item) => {
            if(new Date(item.deadline).getFullYear() == new Date().getFullYear()){
                if(new Date(item.deadline).getMonth() == new Date().getMonth()){
                    if(new Date(item.deadline).getDate() == new Date().getDate()){
                        return item;
                    }
                }
            }
        })
        showTasks(newArray);
    }
    else if(e.target.value == 'upcoming'){
        let newArray = []
        newArray = finalArray.filter((item) => {
            if(new Date(item.deadline).getFullYear() >= new Date().getFullYear()){
                if(new Date(item.deadline).getMonth() >= new Date().getMonth()){
                   if(new Date(item.deadline).getMonth() == new Date().getMonth()){
                        if(new Date(item.deadline).getDate() <= new Date().getDate()){
                            return false;
                        }
                        if(new Date(item.deadline).getDate() > new Date().getDate()){
                            return item;
                        }
                   }
                   return item;
                }
            }
        })
        showTasks(newArray);
    }
    else{
        showTasks(finalArray)
    }
}

// Event Listeners

addTaskBtn.addEventListener('click' , addTask)
updateTaskBtn.addEventListener('click' , confirmUpdateTask)
resetTaskBtn.addEventListener('click' , closePopup)
overlay[0].addEventListener('click' , closePopup)
confirmAddTaskBtn.addEventListener('click' , confirmAddTask)
taskName.addEventListener('input' , checkInput)
taskCategory.addEventListener('input' , checkInput)
taskDeadline.addEventListener('input' , checkInput)
timing.addEventListener('change' , sortingTasks)

// Init

showTasks()
