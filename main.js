// Змінні які я потім використовую в коді
const input = document.getElementById("inputField");
const addContent = document.querySelector(".add");
const showContent = document.querySelector(".displayForOutput");
const warningMessage = document.querySelector(".warning-message");
const sortByNameContent = document.querySelector(".sortByName");
const sortByValueContent = document.querySelector(".sortByValue");
const deleteButton = document.querySelector(".deletePost");


// В цю змінну записуються значення з поля вводу
let newArray = [];


// Змінна для вибору певного елементу з списку
let selectSomeElement = false;


// Функція для відображення помилкового вводу даних на сторінці
function displayWarningContentOnPage() {
    warningMessage.textContent = "Please enter a valid Name/Value Pair.";
    setTimeout(() => {
        warningMessage.textContent = "";
    }, 3000);
    input.value = "";
}


// Подія при кліку на кнопку в результаті чого ми провірюємо поле вводу на правильність вводу значень символів
addContent.addEventListener("click", () => {
    const inputValue = input.value.trim();
    const splitEqually = inputValue.split("=").map(item => {
        if (item.length >= 1) {
            return item.trim();
        } else {
            displayWarningContentOnPage();
        }
    });

    if (splitEqually.length - 1 === 1) {
        input.value = "";
        let isValidValue = true;

        for (const everySymbol of inputValue) {
            if (!(everySymbol.toUpperCase() !== everySymbol.toLowerCase()) &&
                isNaN(Number(everySymbol)) &&
                everySymbol !== "="
            ) {
                isValidValue = false;
                displayWarningContentOnPage()
                break;
            }
        }

        if (isValidValue) {
            newArray.unshift(inputValue);
            showContent.textContent = "";
            const ulElements = document.createElement("ul");
            ulElements.classList.add("listOfItems");
            showContent.appendChild(ulElements);

            newArray.forEach(item => {
                const listOfItem = document.createElement("li");
                listOfItem.textContent = item;
                showContent.appendChild(listOfItem);
            });
        } else {
            displayWarningContentOnPage()
        }
    } else {
        displayWarningContentOnPage();
    }
});


// Подія при кліку на кнопку в результаті чого ми сортуємо список елементів по імені
sortByNameContent.addEventListener("click", () => {
    const sortedArray = [...newArray].sort((a, b) => {
        const firstElement = a.split("=")[0].trim();
        const secondElement = b.split("=")[0].trim();
        return firstElement.localeCompare(secondElement);
    });
    showContent.textContent = "";
    const ulElements = document.createElement("ul");
    showContent.appendChild(ulElements);

    sortedArray.forEach(item => {
        const listOfItem = document.createElement("li");
        listOfItem.textContent = item;
        ulElements.appendChild(listOfItem);
    });
});


// Подія при кліку на кнопку в результаті чого ми сортуємо список елементів по значенні
sortByValueContent.addEventListener("click", () => {
    const sortedArray = [...newArray].sort((a, b) => {
        const firstElement = a.split("=")[1].trim();
        const secondElement = b.split("=")[1].trim();
        return firstElement.localeCompare(secondElement);
    });
    showContent.textContent = "";
    const ulElements = document.createElement("ul");
    showContent.appendChild(ulElements);

    sortedArray.forEach(item => {
        const listOfItem = document.createElement("li");
        listOfItem.textContent = item;
        ulElements.appendChild(listOfItem);
    });
});


// Подія при кліку на кнопку в результаті чого ми робимо на елемент списку добавлення класу
showContent.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        if (selectSomeElement) {
            selectSomeElement.classList.remove("selectSomeElement");
        }
        selectSomeElement = event.target;
        selectSomeElement.classList.add("selectSomeElement");
    }
});


// Подія при кліку на кнопку в результаті чого ми видаляємо виділений елемент списку
deleteButton.addEventListener("click", () => {
    if (selectSomeElement) {
        selectSomeElement.remove();
        selectSomeElement = false;
    } else {
        displayWarningContentOnPage()
    }
});







