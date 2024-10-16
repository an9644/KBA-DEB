const readline= require('readline')
    rl=readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })

    const bookinventory =new Map()

        function askcommand(){
            console.log('Welcome to Book Inventory')
            console.log('Available Commands: add,remove,update,search,summary,exit')
            rl.question('Enter Your Command :', function(command){
            switch(command.trim().toLowerCase()){
                    case 'add':
                        addItemPrompt();
                        break;
                    case 'remove':
                        removeItemPrompt();
                        break;
                    case 'update':
                        updateItemPrompt();
                        break;
                    case 'search':
                        searchItemPrompt();
                        break;
                    case 'summary':
                        printsummary();
                        break;
                    case 'exit':
                        rl.close();
                        break;
                    default :
                        console.log('Enetr a valid Command')
                        askcommand();
                        break;
              }
            })
        }   
        //add
        
    function addItemPrompt(){
        rl.question('Enter the book id:',function(id){
            rl.question('Enter book title: ', function(title){
                rl.question('Enter book author:',function(author){
                    rl.question('Enetr book genre:',function(genre){
                        addItem(id,title,author,genre)
                            askcommand()
                        })
                    })
                })
            })
        }
    
    function addItem(id,title,author,genre){
        if(bookinventory.has(id)){
            console.log(`The ID ${id}  was already exist`)
        }else{
            bookinventory.set(id,{title,author,genre})
            console.log('Successfully added')
        }
    }
    //remove
    function removeItemPrompt(){
        rl.question('Eneter id to remove item :',function(id){
            removeItem(id)
            askcommand();
        })
    }
    function removeItem(id){
        if(bookinventory.has(id)){
            bookinventory.delete(id);
            console.log(`Book with id ${id} was removed`)
        }else{
            console.log(`No book found id ${id}`)
        }
    }
    //update
    function updateItemPrompt(){
            rl.question('Enter the book id:',function(id){
                rl.question('Enter book title: ', function(newtitle){
                    rl.question('Enter book author:',function(newauthor){
                        rl.question('Enetr book genre:',function(newgenre){
                            updateItem(id,newtitle,newauthor,newgenre)
                                updateItem({id, ...item})
                                askcommand()
                            })
                        })
                    })
                })
            }

            function updateItem(id,newtitle,newauthor,newgenre){
       if (bookinventory.has(id)) {
        const item = bookinventory.get(id);
        item.title = newtitle || item.title;
        item.author = newauthor || item.author;
        item.genre = newgenre || item.genre;

        bookinventory.set(id, item);
        console.log(`items with ${id} updated`);
    }
    else {
        console.log('No item found');
    }}
    //search

   function searchItemPrompt(){
            rl.question(`Enetr the term for search:`, function(searchterm){
                searchItem(searchterm)
                askcommand();
           })
   }
    function searchItem(searchterm){
        const  result=[];
        for(const [id,item] of  bookinventory){
        if(bookinventory.has(id)){
            if(id.includes(searchterm)|| item.title.includes(searchterm) || item.author.includes(searchterm)||item.genre.includes(searchterm)){
                    result.push({id,...item})
              console.log(`the term is:`,result)

        }else{
                console.log('The term does not exist')}  } 
        } 
    }
        //summary
    function printsummary(){
    if(inventory.size>0){
        console.log('Inventory Summary:');
        for(const [id,item] of inventory){
            console.log(`ID: ${id}, Name: ${item.name}, Category: ${item.category},
                Quantity: ${item.quantity}`);
        }
    } else {
        console.log('No items found!');
    }
}
askcommand();