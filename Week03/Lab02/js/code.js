const greenbtn = document.querySelector(".green");

greenbtn.addEventListener("click", () => alert("Thanks! You're okay too"));


const bluebtn = document.querySelector(".blue");

bluebtn.addEventListener("click", () => {
  let readMoreDiv = document.querySelector("#readmore");
  readMoreDiv.classList.toggle("hideshow");
});

const redbtn = document.querySelector(".red");

redbtn.addEventListener("click", () => {
 let username = prompt("What's your name?");
 let names = username.split(" ");
 let newusername = "";

 for (let i = 0; i < names.length; i++) {
  let word = names[i].substring(0,1).toUpperCase() + names[i].substring(1).toLowerCase();
  newusername += word + " ";
  }

  document.querySelector("h1").textContent = `Welcome to the App, ${newusername} !`;
  
});