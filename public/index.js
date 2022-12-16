let todoListAlreadyExists = false;
const textInput = document.querySelector("input[type=text].todo-input")
textInput.focus()
let textInputValue = textInput.value
const todoListContainer = document.querySelector('.list-container')

if(!localStorage.todolist){
    localStorage.todolist = JSON.stringify([])
}
const todoListStorage = JSON.parse(localStorage.todolist)

function printStoredList(){
    todoListContainer.innerHTML=""
    todoListStorage.map((todoItem,id)=>{
          todoListContainer.innerHTML+=`
          <div class="todoItem-container">
            <input ${todoItem.checked?"checked":""} onclick="markItem(this.id)" type="checkbox" name="" id="${id}">
            <h1 class="${todoItem.checked?"doneItem":""}">${todoItem.item}</h1>
            <button class="remove-button" id="${id}" onclick="removeItem(this.id)">
            <i class="fa-solid fa-trash"></i>
            </button>
          </div>
            `
    })
  
}

printStoredList(todoListStorage)


function checkForStorageExistence() {
    textInputValue = textInput.value

    if(localStorage.todolist){
        todoListAlreadyExists = true
    }

    if(todoListAlreadyExists){
        checkIfTheItemAlreadyExists(textInputValue)
    }else {
        localStorage.todoList = []
        checkIfTheItemAlreadyExists(textInputValue)

    }


}

function checkIfTheItemAlreadyExists(val){
    // let counter = 0;
    // todoListStorage.map((it)=>{
    //     if(it.item === val) {
    //         counter=counter+1
    //     }
    // })
    // if(!counter){
    // }
    addItemToList(val)
    
}

function addItemToList(val){
    todoListStorage.push({item:val,checked:false})
    localStorage.todolist = JSON.stringify([...todoListStorage])
    printStoredList(todoListStorage)
}

function removeItem(id){
    todoListStorage.splice(id,1);
    localStorage.todolist = JSON.stringify([...todoListStorage])
    printStoredList(todoListStorage)
}

function markItem(id){
    todoListStorage[id].checked = true
    localStorage.todolist = JSON.stringify([...todoListStorage])
    printStoredList(todoListStorage)
}