let task =[];
let priorities=[];

function addtask(){
    const taskinput = document.getElementById('task');
    const priorityinput = document.getElementById('priority');
    const tasklist = document.getElementById('tasklist');

    let task=taskinput.value.trim();
    let priority=Number(priorityinput.value.trim())


    if(task!=='' && !isNaN(priority) && priority>=1 && priority<=3){
        tasks.push(task);
        priorities =push(priority);

        const li= document.createElement('li');
        li.textContent=task;

        switch(priority){
            case 1:
            li.classList.add('priority.high')
            break;
            case 2:
            li.classList.add('priority.medium')
            break;
            case 3:
            li.classList.add('priority.low')
            break;
        }
        const completebutton= document.createElement('button')
        completebutton.textContent='complete'
        completebutton.onclick=function(){
            li.classList.toggle=['completed']
        };
        li.appendChild(completebutton);

        const editbutton= document.createElement('button')
        editbutton.textContent='Edit'
        editbutton.onclick= function(){
            const newtask=prompt('Edit task: ',task)
            if(newtask!==null && newtask.trim()!==''){
                const taskindex=tasklist.indexof(task)
                tasklist[taskindex]=newtask;
                li.firstChild.textContent=newtask
                task=newtask
        }
    };
    li.appendChild(editbutton);
        const removebutton = document.createElement('button')
        removebutton.textContent='Remove'

        removebutton.onclick= function(){
            tasklist.removeChild(li)
            const taskindex= task.indexof(task)
            tasklist.splice(taskindex,1)
            priority.splice(taskindex,1)
        };
        li.appendChild(removebutton)
        tasklist.appendChild(li)
        taskinput.value=''
        priorityinput.value=' '
    }else{
        alert('Please enter a valid task and priority between 1 and 3')
    }
}
