(function(){
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    };
    
    function saveToLocalStorage(arrDeal, count){
        if(count === 1){
            localStorage.setItem("arrDeal.site1", JSON.stringify(arrDeal));
        }
        if(count === 2){
            localStorage.setItem("arrDeal.site2", JSON.stringify(arrDeal));
        }
        if(count === 3){
            localStorage.setItem("arrDeal.site3", JSON.stringify(arrDeal));
        } 
    };

    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = ('Введите название нового дела')
        buttonWrapper.classList.add('item-group-append');
        button.classList.add('btn' ,'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(arrDeal, name, done = false, count) {
        let item = document.createElement('li');
        let temp = {
            name,
            done,
        };
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        temp.name = name;
        temp.done = done;

        arrDeal.push(temp);

        saveToLocalStorage(arrDeal, count);
        
        return {
            temp,
            item,
            doneButton,
            deleteButton,
        };
        
    }

    function showTodoItem(name, done){
        let temp = {
            name,
            done,
        };
        temp.name = name;
        temp.done = done;
        
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';
        if(done === true){
            item.classList.toggle('list-group-item-success');
        }
        
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        
        return {
            item,
            doneButton,
            deleteButton,
            temp,
        };
    }


    function createTodoApp (container, title = 'Список дел', arrDeal, count){
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        console.log(arrDeal.length);
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        

        for(let i in arrDeal){
            if(arrDeal.length === 0){
                console.log('-');
                break;
            }
            else{
                let itemArr = showTodoItem(arrDeal[i].name, arrDeal[i].done);
                addEventButton(arrDeal, itemArr, count);
                todoList.append(itemArr.item);
            }
        }

        let disable = setInterval(timerDisable, 100);  

        function timerDisable(){
            if (!todoItemForm.input.value) {
                todoItemForm.button.disabled = true;
                todoItemForm.button.classList.add('disabled');
            }
            else {
                todoItemForm.button.disabled = false;
                todoItemForm.button.classList.remove('disabled');
            }
        }

        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();

            if(!todoItemForm.input.value){
                return;
            }

            let todoItem = createTodoItem(arrDeal, todoItemForm.input.value, false, count);

            addEventButton(arrDeal, todoItem, count);

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';

        })

        function addEventButton(arrDeal, todoItem, count){
            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
                if(todoItem.item.classList.contains('list-group-item-success')){
                    todoItem.temp.done = true;
                    for (let i in arrDeal) {
                        if (arrDeal[i].name === todoItem.temp.name) {
                            arrDeal[i] = todoItem.temp;  
                        }
                    }

                    saveToLocalStorage(arrDeal, count); 

                }
                else {
                    todoItem.temp.done = false;
                    for (let i in arrDeal) {
                        if (arrDeal[i].name === todoItem.temp.name) {
                            arrDeal[i] = todoItem.temp;  
                        }
                    }

                    saveToLocalStorage(arrDeal, count); 
                }
            });

            todoItem.deleteButton.addEventListener('click', function(){
                if(confirm('Вы уверены?')){
                    todoItem.item.remove();
                    deleteTodoItem(arrDeal, todoItem.temp.name, count);
                }
            });
        }

        function deleteTodoItem(arrDeal, value, count){

            for (let i in arrDeal) {
                if (arrDeal[i].name === value) {
                    arrDeal.splice(i,1);
                }
            }
            saveToLocalStorage(arrDeal, count);
            return arrDeal;
        };
    }

    window.createTodoApp = createTodoApp;

    

})();

