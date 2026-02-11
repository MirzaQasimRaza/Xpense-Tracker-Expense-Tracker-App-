let balance = document.getElementById("balance");
let productbar = document.getElementById("productbar");
let amountbar = document.getElementById("amountbar");
let addBtn = document.getElementById("add");
let history = document.querySelector(".history");

let count = localStorage.length;
let currentBalance = 2000;

balance.textContent = "$" + currentBalance.toFixed(2);

addBtn.addEventListener("click",()=>{
    let product = productbar.value.trim();
    let amount = parseFloat(amountbar.value.trim());

    if((product === "") || (amount < 0) || (isNaN(amount))){
        alert("Please Enter Valid Product Name and Amount");
        return;
    }

    let key = "transaction_" + count;
    let value = product + " $" + amount;

    localStorage.setItem(key,value);
    createElementsToDOM(key,product,amount);
    count++;
    productbar.value = "";
    amountbar.value = "";

})

function createElementsToDOM(key,product,amount){
        let div = document.createElement("div");
        div.classList.add("item");
        setTimeout(()=>{
            div.classList.add("show");
        },10)

        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let deleteBtn = document.createElement("button");

        p1.innerText = product;
        p2.innerText = "$" + amount;
        deleteBtn.innerText = "X";

        currentBalance -= amount;
        balance.textContent = "$" + currentBalance.toFixed(2);

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(deleteBtn);
        history.appendChild(div);

        deleteBtn.onclick = function(){
            localStorage.removeItem(key);
            currentBalance += amount;
            balance.textContent = "$" + currentBalance.toFixed(2);
            div.remove();
        }
    }

window.onload = () =>{
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        if(startsWith("transaction_")){
            let value = localStorage.getItem(key);
            [product,amount] = value.split("||");
            createElementsToDOM(key,product,amount);
        }
    }
}