//array
let books=[];
let priorities=[];

//function
 function addbook(){
    const bookinput=document.getElementById('book')
    const priorityinput=document.getElementById('priority')
    const booklist =document.getElementById('booklist')

    let book=bookinput.value.trim();
    let priority=Number(priorityinput.value.trim());

     
     if(book!=='' && !isNaN(priority) && priority>=1 && priority<=3){
        books.push(book)
        priorities.push(priority)

        const li=document.createElement('li')
        li.textContent=book

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

        const readbtn= document.createElement('button')
        readbtn.textContent='Read'
         readbtn.onclick=function(){
                li.classList.toggle('read')
         }
         li.appendChild(readbtn)

         const editbtn= document.createElement('button')
         editbtn.textContent='Edit'
         editbtn.onclick=function(){
            const newbook=prompt('Edit Book Title:',book)
            if(newbook!==null && (newbook).trim()!==''){
                const bookindex=books.indexOf(book)
                books[bookindex]=newbook
                li.firstChild.textContent=newbook
                book=newbook
            }
         }
         li.appendChild(editbtn)

         const removebtn= document.createElement('button')
         removebtn.textContent='Remove'
         removebtn.onclick=function(){
            const bookindex=books.indexOf(book)
            li.removeChild(li)
            books.splice(bookindex,1)
            priorities.splice(bookindex,1)
         }
         li.appendChild(removebtn)

         bookinput.value=''
         priorityinput.value=''
                 


        }else{
            alert('Please enter book title and priority between 1 and 3')
        }

}

