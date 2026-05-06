document.addEventListener("DOMContentLoaded", () => {  //Lets html load up fully before js

    const page = window.location.pathname.toLocaleLowerCase();  //checks which page is being viewed

    const games = [
        {   
            id: crypto.randomUUID(),         // I needed to ask ask google how to give each game a unique number so it could be deleted safely
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

    let gamesData = JSON.parse(localStorage.getItem("gamesplus")) || games;  //local storage

    if (page.includes("data")) {

    Handlebars.registerHelper("formatPrice", (price) => {  //format price handlebar helper
        const num = Number(price);
        return !isNaN(num)
            ? num.toLocaleString("en-IE", {
                style: "currency",
                currency: "EUR",
              })
            : "€0.00";
    });
    }

    const addGame = (title, price, genre, date, rating) => {  //add game
        const newGame = {
            id: crypto.randomUUID(),
            title: title,
            price: price,
            genre: genre,
            date: date,
            rating: rating
        };
        gamesData.push(newGame);
        localStorage.setItem("gamesplus", JSON.stringify(gamesData));  //pushes new games to gamesData
    };

    const saveData = () => {
        localStorage.setItem("gamesplus", JSON.stringify(gamesData));  //saves to local storage
    };

    if (page.includes("welcome") || page === "/assignment/") {

        const gallery = document.querySelector('#gallery');
        const namebtn = document.querySelector(".name-btn");  

        if (gallery) {
            lightGallery(document.querySelector('#gallery'), {
                plugins: [lgZoom, lgThumbnail, lgFullscreen],
                thumbWidth: 80,
                controls: true,
                getCaptionFromTitleOrAlt: true,
                loop: true,
                actualSize: false,
                counter: true,
                fullScreen: true,
                zoom: true,                                               //welcome page lightgallery and add name btn js
                mode: 'lg-fade'
            });
        }

        if (namebtn) {
            namebtn.addEventListener("click", () => {
                const name = document.querySelector("#username").value;

                if (!name) {
                    alert("Please enter your name"); 
                    return;
                }

                let formattedName = "";
                const words = name.split(" ");

                words.forEach(word => {
                    formattedName += word.charAt(0).toUpperCase() +
                                    word.substring(1).toLowerCase() + " ";
                });

                document.querySelector("#greeting").textContent =
                    `Welcome ${formattedName}`;
            });
        }
    }

    if (page.includes("data.html")) {

    const form = document.querySelector("#inputForm");
    const table = document.querySelector("table");
    const btn = document.querySelector("#add");    //gets all the important elements and compiles the handlebars template
    const close = document.querySelector("#close");
    const dialog = document.querySelector("dialog");

    const template = Handlebars.compile(document.querySelector('#card-template').innerHTML);

    const displayRecs = (theData, thedisplay) => {
        let output = template(theData);               //displays the games in the table
        thedisplay.innerHTML = output;
    };

    const formvalues = (evt) => {
        evt.preventDefault();  //prevnts page refresh 

        const title = form.elements.title.value;
        const price = parseFloat(form.elements.price.value);  
        const genre = form.elements.genre.value;
        const date = form.elements.date.value;
        const rating = form.elements.rating.value;

        if (isNaN(price) || price < 0) {
            alert("Price must be a positive number");         //add game form
            return;
        }

        addGame(title, price, genre, date, rating);
        saveData();  //saves to local
        displayRecs(gamesData, table);
        updateTotalValue(gamesData);  //updates the value for the average function 
        form.reset();
        dialog.close();
    };


        const updateTotalValue = (data) => {
            if (data.length === 0) {
                document.querySelector("#total-price").textContent = "€0.00";
                return;
            }

            let sum = 0;
            data.forEach(item => {                          //loops through games and displays average price
                sum += item.price;
            });

            const average = sum / data.length;

            document.querySelector("#total-price").textContent = average.toLocaleString("en-IE", {
                style: "currency",
                currency: "EUR",
            });
        };

        table.addEventListener("click", (evt) => {
            if (evt.target.matches("button")) {
                const gameId = evt.target.dataset.id;
                gamesData = gamesData.filter(game => game.id !== gameId);    //delete a agmae using the unique id from the randomUUID
                saveData();
                displayRecs(gamesData, table);
                updateTotalValue(gamesData);
            }
        });

        document.querySelector("#search").addEventListener("input", (evt) => {
            const searchQuery = evt.target.value.toLowerCase();
            const filtered = gamesData.filter(game =>
                game.title.toLowerCase().includes(searchQuery)   //search funtion for titles
            );
            displayRecs(filtered, table);
            updateTotalValue(filtered);
        });

        document.querySelector("#sort-price-acc").addEventListener("click", () => {
            const sorted = [...gamesData].sort((a, b) => a.price - b.price);
            displayRecs(sorted, table);
        });                                                                                    //sort btns for price

        document.querySelector("#sort-price-desc").addEventListener("click", () => {
            const sorted = [...gamesData].sort((a, b) => b.price - a.price);
            displayRecs(sorted, table);
        });

        form.addEventListener("submit", formvalues);
        btn.addEventListener("click", () => dialog.showModal());     //contols the add game pop up window
        close.addEventListener("click", () => dialog.close());

        displayRecs(gamesData, table);
        updateTotalValue(gamesData);
    }

    if (page.includes("about.html")) {

        const showBtn = document.querySelector('.show-btn');
        const gallery = document.querySelector('#hidden-gallery');

        if (showBtn) {
            showBtn.addEventListener('click', () => {                  
                gallery.classList.toggle('show');                           //show/hide gallery on about page
                if (gallery.classList.contains('show')) {
                    showBtn.textContent = "Show Less";
                } else {
                    showBtn.textContent = "More before and afters";
                }
            });
        }

        const comments = [
            { name: "Alice", message: "Great website!" },
            { name: "John", message: "Very useful project." }
        ];

        const form = document.querySelector('#commentForm');
        const container = document.querySelector('#commentsContainer');             //i needed to ask google for the code for the comments section
                                                                                    //basically this loads the set of starter comments and compiles the handlebars template for them
        const source = document.querySelector('#comments-template').innerHTML;
        const template = Handlebars.compile(source);          

        const renderComments = () => {
            const reversed = [...comments].reverse();
            container.innerHTML = template({ comments: reversed });
        };

        if (form) {
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();

                const name = document.querySelector('#name').value;
                const message = document.querySelector('#message').value;

                comments.push({ name, message });

                renderComments();
                form.reset();
            });
        }

        renderComments();
    }

});
