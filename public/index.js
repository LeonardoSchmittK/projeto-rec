let todoListAlreadyExists = false;
const numberOfItemsEl = document.querySelector(".number-of-items")
const mainBtn = document.querySelector(".btn-add-items")
const textInput = document.querySelector("input[type=text].todo-input")
textInput.focus()
let textInputValue = textInput.value
const todoListContainer = document.querySelector('.list-container')

if(!localStorage.todolist){
    localStorage.todolist = JSON.stringify([])
}
const todoListStorage = JSON.parse(localStorage.todolist)

function printStoredList(){
    numberOfItemsEl.innerHTML=todoListStorage.length
    todoListContainer.innerHTML=""
    todoListStorage.map((todoItem,id)=>{
          todoListContainer.innerHTML+=`
          <li class="todoItem-container">
            <input ${todoItem.checked?"checked":""} onclick="markItem(this.id)" type="checkbox" name="" id="${id}">
            <h1 class="${todoItem.checked?"doneItem":""}">${todoItem.item}</h1>
            <button class="remove-button" id="${id}" onclick="removeItem(this.id)">
            <i class="fa-solid fa-trash"></i>
            </button>
          </li>
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
    numberOfItemsEl.innerHTML=todoListStorage.length


}

function checkIfTheItemAlreadyExists(val){
    let exists = false;
    document.querySelectorAll(".list-container h1").forEach((item)=>{
        if(item.innerHTML===val){
            item.className+=" stand-out"
            exists = true

            setTimeout(()=>{
                item.className=""
            },500)
        }
    })
    if(exists===false){
        addItemToList(val)

    }
    
}

function addItemToList(val){
    todoListStorage.push({item:val,checked:false})
    localStorage.todolist = JSON.stringify([...todoListStorage])
    printStoredList(todoListStorage)
    numberOfItemsEl.innerHTML=todoListStorage.length
    textInput.value=""
    textInput.focus()
}

function removeItem(id){
    todoListStorage.splice(id,1);
    localStorage.todolist = JSON.stringify([...todoListStorage])
    printStoredList(todoListStorage)
    numberOfItemsEl.innerHTML=todoListStorage.length

}

function markItem(id){
    todoListStorage[id].checked = true
    localStorage.todolist = JSON.stringify([...todoListStorage])
    printStoredList(todoListStorage)

}