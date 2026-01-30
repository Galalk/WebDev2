const btnA = document.querySelector("#acceptButton");
btnA.addEventListener("click", (evt) => {
    btnA.textContent = ("Call Accepted")
    btnA.classList.add("accepted")
})

const btnD = document.querySelector("#declineButton");
btnD.addEventListener("click", (evt) => {
    btnD.textContent = ("Call Declined")
    btnD.classList.add("declined")
})

const btnM = document.querySelector("#messageButton");
btnM.addEventListener("click", (evt) => {
    btnM.textContent = ("Sending Message...")
    btnM.classList.add("message")
    setTimeout(() => {
    alert("I will call you later"); // Show alert after update
    }, 200);

})
