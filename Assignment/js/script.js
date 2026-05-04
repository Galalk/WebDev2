const games =[
    {   
        id: crypto.randomUUID(),     // I needed to ask ask google how to give each game a unique number so it could be deleted safely //
        title: "Red Dead Redemption 2",
        price: 24.99,
        genre: "Action/Adventure",
        date: "2008/10/26",
        rating: "PEGI 18",
    },
    {
        id: crypto.randomUUID(),
        title: "Call of Duty: Modern Warfare",
        price: 19.99,
        genre: "Shooter",
        date: "2019-10-25",
        rating: "PEGI 16",
    },
    {
        id: crypto.randomUUID(),
        title: "FIFA 21",
        price: 14.99,
        genre: "Sports",
        date: "2020-10-09",
        rating: "PEGI 3",
    },
    {
        id: crypto.randomUUID(),
        title: "The Witcher 3: Wild Hunt",
        price: 9.99,
        genre: "Role-playing",
        date: "2015-05-19",
        rating: "PEGI 18",
    },
    {
        id: crypto.randomUUID(),
        title: "Forza Horizon 5",
        price: 29.99,
        genre: "Racing",
        date: "2018-11-10",
        rating: "PEGI 3",
    },
];

let gamesData = JSON.parse(localStorage.getItem("gamesplus")) || games;

Handlebars.registerHelper("formatPrice", (price) => {
    const num = Number(price);
    return !isNaN(num)
        ? num.toLocaleString("en-IE", {                                //needed help from google for overall layout and where each fuction should be placed
            style: "currency",                                         //as some of it wasnt working properly
            currency: "EUR",
          })
        : "€0.00";
});

    const addGame = (title, price, genre, date, rating) => {
        const newGame = {
            id: crypto.randomUUID(),
            title: title,
            price: price,
            genre: genre,
            date: date,
            rating: rating
    };
    gamesData.push(newGame);
    localStorage.setItem("gamesplus", JSON.stringify(gamesData));
}

    const closeBtn = document.querySelector("#close");
    closeBtn.addEventListener("click", () => {
        dialog.close();
    });

    const displayRecs = (theData, thedisplay) => {
        let output = template(theData);
        thedisplay.innerHTML = output;
    };

    

