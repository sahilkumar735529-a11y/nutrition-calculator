const search = document.getElementById("search");
const qty = document.getElementById("qty");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");

const calories = document.getElementById("calories");
const protein = document.getElementById("protein");
const fat = document.getElementById("fat");
const carbs = document.getElementById("carbs");

let foodList = [];

function renderFoods() {

    tableBody.innerHTML = "";

    let totalCal = 0;
    let totalPro = 0;
    let totalFat = 0;
    let totalCarb = 0;

    foodList.forEach((item, index) => {

        totalCal += item.calories;
        totalPro += item.protein;
        totalFat += item.fat;
        totalCarb += item.carbs;

        tableBody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.calories.toFixed(1)}</td>
            <td>${item.protein.toFixed(1)}</td>
            <td>${item.fat.toFixed(1)}</td>
            <td>${item.carbs.toFixed(1)}</td>
            <td><button onclick="deleteFood(${index})">❌</button></td>
        </tr>
        `;
    });

    calories.innerText = totalCal.toFixed(1);
    protein.innerText = totalPro.toFixed(1);
    fat.innerText = totalFat.toFixed(1);
    carbs.innerText = totalCarb.toFixed(1);
}

function deleteFood(index) {
    foodList.splice(index, 1);
    renderFoods();
}

addBtn.addEventListener("click", function () {

    const foodName = search.value.trim().toLowerCase();
    const quantity = Number(qty.value);

    if (foodName === "" || quantity <= 0) {
        alert("Please enter food name and quantity");
        return;
    }

    if (!foods[foodName]) {
        alert("Food not found");
        return;
    }

    const food = foods[foodName];
    let factor;

if (food.piece) {
    factor = quantity;
} else {
    factor = quantity / 100;
}

    foodList.push({
        name: food.name,
       qty: food.piece ? quantity + " pcs" : quantity + " g",
        calories: food.cal * factor,
        protein: food.protein * factor,
        fat: food.fat * factor,
        carbs: food.carbs * factor
    });

    renderFoods();

    search.value = "";
    qty.value = "";
});

renderFoods();