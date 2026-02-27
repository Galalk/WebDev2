const callStatus = document.querySelector("#callStatus");
const btnA = document.querySelector("#acceptButton");
btnA.addEventListener("click", (evt) => {
    callStatus.textContent = ("Call Accepted")
    btnA.classList.add("accepted")
})

const btnD = document.querySelector("#declineButton");
btnD.addEventListener("click", (evt) => {
    callStatus.textContent = ("Call Declined")
    btnD.classList.add("declined")
})

const btnM = document.querySelector("#messageButton");
btnM.addEventListener("click", (evt) => {
    callStatus.textContent = ("Sending Message...")
    btnM.classList.add("message")
    setTimeout(() => {
    alert("I will call you later"); // Show alert after update
    }, 200);

})
