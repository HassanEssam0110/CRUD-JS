let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let mood = 'create';
let tmpIndex;
//Get total Price
function getTotal() {
    if (price.value !== '') {
        let resultBefore = Number(price.value) + Number(taxes.value) + Number(ads.value);
        let dis = Number(discount.value) / 100;
        let resultAfter = resultBefore - (resultBefore * dis);
        total.innerHTML = resultAfter.toFixed(2);
        total.style.backgroundColor = '#2d8b4e';
    } else {
        total.innerHTML = '0';
        total.style.backgroundColor = '#da2828';
    }
}


//Create Prodect aray
let arraydataPro;

if (localStorage.Products != null) {
    arraydataPro = JSON.parse(localStorage.Products);
} else {
    arraydataPro = [];
}


create.onclick = function () {
    createProduct();
    ShowData();
}


function createProduct() {
    //create object 
    let newProObject = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '' && newProObject.count < 100) {
        if (mood === 'create') {

            if (newProObject.count > 1) {
                for (let i = 0; i < newProObject.count; i++) {
                    arraydataPro.push(newProObject);
                }
            }
            else {
                arraydataPro.push(newProObject);
            }

        }
        else {
            arraydataPro[tmpIndex] = newProObject;
            create.innerHTML = "create"
            create.classList.remove("update-btn");
            count.style.display = "block"
            mood = 'create';
        }
        clearData();
    }


    //handel and save array in localStorge
    localStorage.setItem('Products', JSON.stringify(arraydataPro));



}


//Clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    count.value = '';
    discount.value = '';
    category.value = '';
    total.innerHTML = '0';
    total.style.backgroundColor = '#da2828';
}

//Read Data
ShowData();
function ShowData() {
    document.getElementById('tbody').innerHTML = '';

    let table = '';

    for (let i = 0; i < arraydataPro.length; i++) {
        table += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${arraydataPro[i].title}</td>
        <td>${arraydataPro[i].price}</td>
        <td>${arraydataPro[i].taxes}</td>
        <td>${arraydataPro[i].ads}</td>
        <td>${arraydataPro[i].discount}</td>
        <td>${arraydataPro[i].total}</td>
        <td>${arraydataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;


    let btnDeleteAll = document.getElementById("delete-all");
    if (arraydataPro.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick="deleteAllData()" >delete all  (${arraydataPro.length})</button>`
    } else {
        btnDeleteAll.innerHTML = ``
    }
}

//delete Data
function deleteData(i) {
    //delete element from array
    arraydataPro.splice(i, 1);
    //update and set array into localstorg
    localStorage.Products = JSON.stringify(arraydataPro);
    //to update data table
    ShowData();
}

function deleteAllData() {
    localStorage.removeItem('Products');
    arraydataPro.splice(0);
    ShowData();
}

//Update Data 
function updateData(i) {
    title.value = arraydataPro[i].title;
    price.value = arraydataPro[i].price;
    taxes.value = arraydataPro[i].taxes;
    ads.value = arraydataPro[i].ads;
    ads.value = arraydataPro[i].ads;
    discount.value = arraydataPro[i].discount;
    getTotal();
    count.style.display = "none"
    category.value = arraydataPro[i].category;
    create.innerHTML = "update"
    create.classList.add("update-btn");
    mood = 'update';
    tmpIndex = i;
    scroll({
        top: 0,
    });
}

//Search Data
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = `🔎 Search by ${searchMood}`
    search.focus();
    search.value = '';
    ShowData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < arraydataPro.length; i++) {
        if (searchMood == 'title') {
            if (arraydataPro[i].title.includes(value.toLowerCase())) {
                table += ` 
                <tr>
                <td>${i + 1}</td>
                <td>${arraydataPro[i].title}</td>
                <td>${arraydataPro[i].price}</td>
                <td>${arraydataPro[i].taxes}</td>
                <td>${arraydataPro[i].ads}</td>
                <td>${arraydataPro[i].discount}</td>
                <td>${arraydataPro[i].total}</td>
                <td>${arraydataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
        else {
            if (arraydataPro[i].category.includes(value.toLowerCase())) {
                table += ` 
                <tr>
                <td>${i + 1}</td>
                <td>${arraydataPro[i].title}</td>
                <td>${arraydataPro[i].price}</td>
                <td>${arraydataPro[i].taxes}</td>
                <td>${arraydataPro[i].ads}</td>
                <td>${arraydataPro[i].discount}</td>
                <td>${arraydataPro[i].total}</td>
                <td>${arraydataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}