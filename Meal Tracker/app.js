// local storage controller


// item controller
const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id
        this.name = name
        this.calories = calories
    }

    // Data Structure / State
    const data = {
        items: [
            //   {id: 0, name: 'Steak Dinner', calories: 1200},
            //   {id: 1, name: 'Cookie', calories: 400},
            //   {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    return { // Public methods
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },

        getItemById: function(id) {
            let found = null

            // loop through items
            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item
                }
            })
            return found
        },
        updatedItem: function(name, calories) {
            // calories to numbers
            calories = parseInt(calories)

            let found = null

            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name
                    item.calories = calories
                    found = item
                }
            })
            return found
        },

        setCurrentItem: function(item){
            data.currentItem = item;
          },

          getCurrentItem: function(){
            return data.currentItem;
          },

          getTotalCalories: function(){
            let total = 0;

        // loop though items and add calories
            data.items.forEach(function (item) {
                total += item.calories
            })

            // set calories
            data.totalCalories = total

            return data.totalCalories
        },

        logData: function () {
            return data;
        }
    }
})();


// ui controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    return { // Public methods
        populateItemList: function (items) {
            let html = '';

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
              <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
              <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil-square-o"></i>
              </a>
            </li>`;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: function (item) {
            // Show item list
            document.querySelector(UISelectors.itemList).style.display = 'block'

            // create li, add class, add id, add HTML
            const li = document.createElement('li')
            li.className = 'collection-item'
            li.id = `item-${item.id}`
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil-square-o"></i>
            </a>`

            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },

        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },

        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

            UICtrl.showEditState();
          },

        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none'
        },

        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories
        },

        clearEditState: function() {
            UICtrl.clearInput()
            document.querySelector(UISelectors.updateBtn).style.display = 'none'
            document.querySelector(UISelectors.deleteBtn).style.display = 'none'
            document.querySelector(UISelectors.backBtn).style.display = 'none'
            document.querySelector(UISelectors.addBtn).style.display = 'inline'
        },

        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
          },

        getSelectors: function () {
            return UISelectors;
        }
    }
})();


// main app controller
const App = (function (ItemCtrl, UICtrl) {

    // function expression to load all event listeners
    const loadEventListeners = function () {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress',  function(e) {
            if(e.keyCode === 13 | e.which === 13) {
                e.preventDefault()
                return false
            }
        })


        // Edit icon click event target item list that button is in
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)
    }

    // Add item submit
    const itemAddSubmit = function(e) {

        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {

            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories)

            // add item to UI list
            UICtrl.addListItem(newItem)

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories()

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories)

            // clear fields
            UICtrl.clearInput()
        }

        e.preventDefault()
    }

    // Edit item in list
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // get list item id
            const listId = e.target.parentNode.parentNode.id

            // break into an array split it at the dash
            const listIdArray = listId.split('-')

            // get actual id
            const id = parseInt(listIdArray[1])

            // get item
            const itemToEdit = ItemCtrl.getItemById(id)

            // set current item
            ItemCtrl.setCurrentItem(itemToEdit)

            // add item to form
            UICtrl.addItemToForm();
        }
        console.log('update')
        e.preventDefault()
    }

    // Update item submit
    const itemUpdateSubmit = function(e){

        // Get item input
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

        e.preventDefault()
    }
    return { // Public methods
        init: function () {
            // clear edit state or set initial state
            UICtrl.clearEditState()

            // Fetch items from data structure
            const items = ItemCtrl.getItems()

            // check if any items
            if (items.length === 0) {
                UICtrl.hideList()
            } else {
                // Populate list with items
                UICtrl.populateItemList(items)
            }

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories()

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories)

            // Load event listeners
            loadEventListeners()
        }
    }

})(ItemCtrl, UICtrl)

// Initialize App
App.init()