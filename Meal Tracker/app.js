// local storage controller only uses strings so must parse to bring it out. Can be seen in console/Application/Storage/Local Storage
const StorageCtrl = (function () {
    return { // public
        storeItem: function (item) {
            let items
            // Check if any items in ls
            if (localStorage.getItem('items') === null) {
                items = []

                // Push new item
                items.push(item)

                // Set local storage
                localStorage.setItem('items', JSON.stringify(items))
            } else {
                // Get items that are already in local storage
                items = JSON.parse(localStorage.getItem('items'))

                // Push new item
                items.push(item)

                // Re set ls
                localStorage.setItem('items', JSON.stringify(items))
            }
        },

        getItemsFromStorage: function () {
            let items
            if (localStorage.getItem('items') === null) {
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items
        },

        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'))

            items.forEach(function (item, index) {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem)
                }
            })
            localStorage.setItem('items', JSON.stringify(items))
        },

        deleteItemFromStorage: function (id) {
            let items = JSON.parse(localStorage.getItem('items'))

            items.forEach(function (item, index) {
                if (id === item.id) {
                    items.splice(index, 1)
                }
            })
            localStorage.setItem('items', JSON.stringify(items))
        },

        clearItemsFromStorage: function () {
            localStorage.removeItem('items')
        }
    }
})();


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
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return { // Public methods
        getItems: function () {
            return data.items
        },

        addItem: function (name, calories) {
            let ID

            // create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }

            // Calories to number
            calories = parseInt(calories)

            // Create new item
            newItem = new Item(ID, name, calories)

            // Add to items array
            data.items.push(newItem)

            return newItem
        },

        getItemById: function (id) {
            let found = null

            // loop through items
            data.items.forEach(function (item) {
                if (item.id === id) {
                    found = item
                }
            })
            return found
        },

        updateItem: function (name, calories) {
            // calories to numbers
            calories = parseInt(calories)

            let found = null

            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name
                    item.calories = calories
                    found = item
                }
            })
            return found
        },

        deleteItem: function (id) {
            // get Ids
            const ids = data.items.map(function (item) {
                return item.id
            })

            //get index
            const index = ids.indexOf(id)

            // remove item
            data.items.splice(index, 1)
        },

        clearAllItems: function () {
            data.items = []
        },

        setCurrentItem: function (item) {
            data.currentItem = item
        },

        getCurrentItem: function () {
            return data.currentItem
        },

        getTotalCalories: function () {
            let total = 0

            // loop though items and add calories
            data.items.forEach(function (item) {
                total += item.calories
            })

            // set calories
            data.totalCalories = total

            return data.totalCalories
        },

        logData: function () {
            return data
        }
    }
})();


// ui controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    return { // Public methods
        populateItemList: function (items) {
            let html = ''

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
              <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
              <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil-square-o"></i>
              </a>
            </li>`
            })

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html
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

        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems)

            // Turn Node list into array
            listItems = Array.from(listItems)

            listItems.forEach(function (listItem) {
                const itemID = listItem.getAttribute('id')

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil-square-o"></i>
                </a>`
                }
            })
        },

        deleteListItem: function (id) {
            const itemID = `#item-${id}`
            const item = document.querySelector(itemID)
            item.remove()
        },

        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },

        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories

            UICtrl.showEditState()
        },

        removeItems: function () {
            let listItems = document.querySelectorAll(UISelectors.listItems)

            // turn node list into array
            listItems = Array.from(listItems)

            listItems.forEach(function (item) {
                item.remove()
            })
        },

        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none'
        },

        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories
        },

        clearEditState: function () {
            UICtrl.clearInput()
            document.querySelector(UISelectors.updateBtn).style.display = 'none'
            document.querySelector(UISelectors.deleteBtn).style.display = 'none'
            document.querySelector(UISelectors.backBtn).style.display = 'none'
            document.querySelector(UISelectors.addBtn).style.display = 'inline'
        },

        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline'
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
            document.querySelector(UISelectors.backBtn).style.display = 'inline'
            document.querySelector(UISelectors.addBtn).style.display = 'none'
        },

        getSelectors: function () {
            return UISelectors
        }
    }
})();


// main app controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {

    // function expression to load all event listeners
    const loadEventListeners = function () {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors()

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

        // Disable submit on enter
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 | e.which === 13) {
                e.preventDefault()
                return false
            }
        })


        // add item click
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

        // edit item event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)

        // update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)

        // delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)

        // back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState)

        // clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick)
    }

    // Add item submit
    const itemAddSubmit = function (e) {

        // Get form input from UI Controller
        const input = UICtrl.getItemInput()

        // Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {

            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories)

            // add item to UI list
            UICtrl.addListItem(newItem)

            // get total calories
            const totalCalories = ItemCtrl.getTotalCalories()

            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories)

            // send to localStorage
            StorageCtrl.storeItem(newItem)

            // clear fields
            UICtrl.clearInput()
        }
        e.preventDefault()
    }

    // Edit item in list
    const itemEditClick = function (e) {
        if (e.target.classList.contains('edit-item')) {
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
            UICtrl.addItemToForm()
        }
        e.preventDefault()
    }

    // Update item submit
    const itemUpdateSubmit = function (e) {

        // get item input
        const input = UICtrl.getItemInput()

        // update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

        // update UI
        UICtrl.updateListItem(updatedItem)

        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories()

        // add total calories to display UI
        UICtrl.showTotalCalories(totalCalories)

        // updaate local storage
        StorageCtrl.updateItemStorage(updatedItem)

        UICtrl.clearEditState()

        e.preventDefault()
    }

    // delete button
    const itemDeleteSubmit = function (e) {
        // get curret item
        const currentItem = ItemCtrl.getCurrentItem()

        // delete from data structure
        ItemCtrl.deleteItem(clientInformation)

        // delete from UI
        UICtrl.deleteListItem(currentItem.id)

        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories()

        // add total calories to display UI
        UICtrl.showTotalCalories(totalCalories)

        // delete in local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id)

        UICtrl.clearEditState()

        e.preventDefault()
    }

    // clear items
    const clearAllItemsClick = function () {
        // delete all items from data
        ItemCtrl.clearAllItems()

        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories()

        // add total calories to display UI
        UICtrl.showTotalCalories(totalCalories)

        // Remove from UI
        UICtrl.removeItems()

        // clear from local storage
        StorageCtrl.clearItemsFromStorage()

        // Hide UL
        UICtrl.hideList()
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

})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init()