// Elements & variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let backDelAlert = document.getElementById("backDelAlert");
let delAlert = document.getElementById("delAlert");
let yes = document.getElementById("yes");
let no = document.getElementById("no");
let table = document.getElementById("table");
let mood = "create";
let searchMood;
let xx;


// the total function
onkeyup = function() {
    if (price.value != "", price.value != 0) {
        total.style.backgroundColor = '#008000';
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
    } else {
        total.innerHTML = "???";
        total.style.backgroundColor = '#ff1a1a';
    }
}
onclick = function() {
    if (price.value != "", price.value != 0) {
        total.style.backgroundColor = '#008000';
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
    } else {
        total.innerHTML = "???";
        total.style.backgroundColor = '#ff1a1a';
    }
}



//my data array
let dataArray;
if (localStorage.product != null) {
    dataArray = JSON.parse(localStorage.product);
} else {
    dataArray = [];
}

let msg = document.getElementById("msg");

function _msg() {
    if (dataArray != "") {
        msg.style.display = "none";
    } else {
        msg.style.display = "block";
    }
}
_msg()

//the create function
let message = document.createElement("p")
message.innerHTML = "please select logical count (1 to 100)"
message.className = "message";
table.after(message);
message.style.display = "none";

create.onclick = function() {
    let data = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
    }
    if (price.value != "" && title.value != "" && category.value != "" && price.value != 0) {
        if (mood === "create") {
            if (100 >= count.value && count.value >= 1) {
                for (let i = 0; i < count.value; i++) {
                    dataArray.push(data);
                    message.style.display = "none";
                }
            } else {
                message.style.display = "block";
            }
            if (count.value === "") {
                dataArray.push(data);
                message.style.display = "none";
            }
            localStorage.setItem('product', JSON.stringify(dataArray));
        } else {
            dataArray[xx] = data;
            localStorage.product = JSON.stringify(dataArray);
            count.style.display = "block";
            create.innerHTML = "Create";
            mood = "create";
        }
    } else {
        let message = document.createElement("p")
        message.innerHTML = "<span>=></span> The <span>title</span> , <span>price</span> and <span>category</span> fields cannot be empty <span><=</span>"
        message.className = "message";
        table.after(message);
    }
    clear();
    read();
    deleteAll()
    _msg()
}


//clear inputs function
function clear() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    count.value = "";
    total.innerHTML = "";
    total.style.backgroundColor = '#ff1a1a';
}

//read function
let tbody = document.getElementById("tbody");

function read() {
    let x = ""

    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i]) {
            let rowData = `<tr>
        <td>${i+1}</td>
        <td class="title">${dataArray[i].title}</td>
        <td>${dataArray[i].price}</td>
        <td>${dataArray[i].taxes}</td>
        <td>${dataArray[i].ads}</td>
        <td>${dataArray[i].discount}</td>
        <td>${dataArray[i].total}</td>
        <td class="category">${dataArray[i].category}</td>
        <td onclick="btnupdate(${i})" id="update" class="update"></td>
        <td onclick="del(${i})" id="delete" class="delete"></td>
        </tr>`
            x += rowData;
        }

    }
    tbody.innerHTML = x;
}
read()

// delete function


function del(i) {
    backDelAlert.style.display = "block";
    yes.onclick = function() {
        dataArray.splice(i, 1);
        localStorage.product = JSON.stringify(dataArray);
        backDelAlert.style.display = "none";
        read();
        _msg();
        deleteAll();
    }
    no.onclick = function() {
        backDelAlert.style.display = "none";
    }
}


//delete all function
let delAll = document.createElement("div");
delAll.className = "delAll";
delAll.innerHTML = "Delete All";
table.before(delAll);
delAll.style.display = "none";

function deleteAll() {
    if (dataArray.length > 0) {
        delAll.style.display = "block";
    } else {
        delAll.style.display = "none";
    }
}
deleteAll()

delAll.onclick = function() {
    backDelAlert.style.display = "block";
    yes.onclick = function() {
        dataArray.splice(0, dataArray.length);
        localStorage.product = JSON.stringify(dataArray);
        delAll.style.display = "none";
        backDelAlert.style.display = "none";
        read();
        _msg();
    }
    no.onclick = function() {
        backDelAlert.style.display = "none";
    }

}

// the update function

function btnupdate(i) {
    window.scrollTo(0, 0)
    title.value = dataArray[i].title;
    price.value = dataArray[i].price;
    taxes.value = dataArray[i].taxes;
    ads.value = dataArray[i].ads;
    discount.value = dataArray[i].discount;
    category.value = dataArray[i].category;
    count.style.display = "none";
    create.innerHTML = "Update";
    mood = "update";
    xx = i;
}


// the search function
function getSearchById(id) {
    search.focus();
    if (id === "searchByTitle") {
        searchMood = "title";
        search.placeholder = "Search By Title..."
    } else {
        searchMood = "category";
        search.placeholder = "Search By Category...";
    }
}

function searchData(value) {
    if (searchMood == "title") {
        let x = "";
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].title.includes(value)) {
                if (dataArray[i]) {
                    let rowData = `<tr>
                <td>${i+1}</td>
                <td class="title">${dataArray[i].title}</td>
                <td>${dataArray[i].price}</td>
                <td>${dataArray[i].taxes}</td>
                <td>${dataArray[i].ads}</td>
                <td>${dataArray[i].discount}</td>
                <td>${dataArray[i].total}</td>
                <td class="category">${dataArray[i].category}</td>
                <td onclick="btnupdate(${i})" id="update" class="update"></td>
                <td onclick="del(${i})" id="delete" class="delete"></td>
                </tr>`
                    x += rowData;
                }
            }
        }
        tbody.innerHTML = x;
    } else {
        let x = "";
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].category.includes(value)) {
                if (dataArray[i]) {
                    let rowData = `<tr>
                <td>${i+1}</td>
                <td class="title">${dataArray[i].title}</td>
                <td>${dataArray[i].price}</td>
                <td>${dataArray[i].taxes}</td>
                <td>${dataArray[i].ads}</td>
                <td>${dataArray[i].discount}</td>
                <td>${dataArray[i].total}</td>
                <td class="category">${dataArray[i].category}</td>
                <td onclick="btnupdate(${i})" id="update" class="update"></td>
                <td onclick="del(${i})" id="delete" class="delete"></td>
                </tr>`
                    x += rowData;
                }
            }
        }
        tbody.innerHTML = x;
    }

}