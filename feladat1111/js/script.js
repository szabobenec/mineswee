let difficulty;
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("akBt").addEventListener("click", function () {
        let sor = document.getElementById("sor").value;
        let oszlop = document.getElementById("oszlop").value;
        let hova = document.getElementById("ak");
        akGeneral(sor, oszlop, hova);

    })
})
var akLogika = [];
function akGeneral(sor, oszlop, hova) {
    hova.innerHTML = "";
    akLogika = [];
    for (let i = 0; i < sor; i++) {
        let sorElem = document.createElement("div");
        sorElem.classList.add("sor");
        akLogika.push([]);
        for (let j = 0; j < oszlop; j++) {
            let oszlopElem = document.createElement("div");
            oszlopElem.classList.add("oszlop");
            oszlopElem.dataset.x = i;
            oszlopElem.dataset.y = j;
            oszlopElem.addEventListener("click", egyfel)
            oszlopElem.addEventListener("contextmenu", jelol);
            sorElem.appendChild(oszlopElem);
            akLogika[i].push(0);
        }
        hova.appendChild(sorElem);
    }
    difficulty = document.getElementById("nehezseg").value;
    console.log(difficulty);
    diff(difficulty);
    logika(akLogika, difficulty);
}

function logika(akL, arany) {
    let x = akL.length;
    let y = akL[0].length;
    let akna = Math.floor(x * y * arany);
    let db = 0;
    while (db < akna) {
        let hx = Math.floor(Math.random() * x);
        let hy = Math.floor(Math.random() * y);
        if (akL[hx][hy] != "A") {
            akL[hx][hy] = "A";
            db++;
        }
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (akL[i][j] != "A") {
                akL[i][j] = korulotte(i, j, akL, x, y);
            }
        }

    }
    console.log(akL);
}
function korulotte(x, y, akL, mx, my) {
    let db = 0;
    for (let i = (x > 0 ? x - 1 : 0); i < (x == mx - 1 ? x + 1 : x + 2); i++) {
        for (let j = (y > 0 ? y - 1 : 0); j < (y == my - 1 ? y + 1 : y + 2); j++) {
            if (akL[i][j] == "A") {
                db++;
            }
        }
    }
    return db;
}
function diff(difficulty) {
    let a = 1;
    let b = 0.1
    for (let i = 0; i < 4; i++) {
        if (difficulty > b) {
            a = a + 5;
        }
        b = b + 0.1;
    }
    for (let i = 0; i < 3; i++) {
        if (difficulty > b) {
            a = a - 5;
        }
        b = b + 0.1;
    }
    document.getElementById("sor").value = a;
    document.getElementById("oszlop").value = a;
}
function felfed() {
    let terulet = document.getElementById("ak");
    for (let i = 0; i < terulet.children.length; i++) {
        for (let j = 0; j < terulet.children[i].children.length; j++) {
            if (akLogika[i][j] == "A" && terulet.children[i].children[j].style.backgroundColor == "orange") {

                terulet.children[i].children[j].innerHTML = "&#x1F4A3;";
            }
            else {
                if (akLogika[i][j] == "A" && terulet.children[i].children[j].style.backgroundColor != "orange") {

                    terulet.children[i].children[j].innerHTML = "&#x1F4A3;";
                    terulet.children[i].children[j].style.backgroundColor = "red";
                }
                else if (akLogika[i][j] != "A" && terulet.children[i].children[j].style.backgroundColor == "green") {

                    terulet.children[i].children[j].style.backgroundColor = "yellowgreen";
                }
                else {
                    terulet.children[i].children[j].style.backgroundColor = "yellow";
                    terulet.children[i].children[j].innerHTML = akLogika[i][j];
                }
            }


            terulet.children[i].children[j].removeEventListener("click", egyfel);
        }
    }
    
    alert("You Lose!");

}
function egyfel() {
    let elem = akLogika[this.dataset.x][this.dataset.y];
    let a = this;
    let nyert = false;
    if (elem != "A") {
        a.style.backgroundColor = "green";
        nyert = nyertE();

        if (elem != 0) {
            a.innerHTML = elem;
        }
        else {
            nullas(a.dataset.x, a.dataset.y);
            if (nyertE()) {
                let terulet = document.getElementById("ak");
                console.log(nyert);
                for (let i = 0; i < akLogika.length; i++) {
                    for (let j = 0; j < akLogika[i].length; j++) {
                        terulet.children[i].children[i].style.backgroundColor = "pink";
                        terulet.children[i].children[i].innerHTML = ":O";
                    }
                }
            }
        }
        a.removeEventListener("click", egyfel);
        a.removeEventListener("contextmenu", jelol);
    }
    else if (elem == "A") {
        a.style.backgroundColor = "red";
        felfed();
    }
    console.log(nyertE());
    if (nyertE()) {
        let terulet = document.getElementById("ak");
        console.log(nyert);
        for (let i = 0; i < akLogika.length; i++) {
            for (let j = 0; j < akLogika[i].length; j++) {
                terulet.children[i].children[j].style.backgroundColor = "pink";
                terulet.children[i].children[j].innerHTML = ":O";
            }
        }
    }

}

function nyertE() {
    let terulet = document.getElementById("ak");
    let i = 0;
    let j = 0;
    let nyert = true;
    while (i < terulet.children.length && nyert) {
        while (j < terulet.children.length && nyert) {
            if (terulet.children[i].children[j].style.backgroundColor == "" && akLogika[i][j] != "A" || terulet.children[i].children[j].style.backgroundColor == "orange" && akLogika[i][j] != "A") {
                nyert = false;
                console.log(i, j);
            }
            j++;
        }
        i++;
    }
    return nyert;
}
function jelol(event) {
    event.preventDefault();
    let a = this;
    if (a.style.backgroundColor == "orange") {
        a.style.backgroundColor = "white"
        a.innerHTML = "";
        a.addEventListener("click", egyfel);
    }
    else {
        a.style.backgroundColor = "orange"
        a.innerHTML = "&#x1F6A9";
        a.removeEventListener("click", egyfel);
    }
    return false;
}
function nullas(bx, by) {
    let ak = document.getElementById("ak");
    let ford = [{ x: bx, y: by }];
    while (ford.length > 0) {
        let ki = ford.shift();
        let x = parseInt(ki.x);
        let y = parseInt(ki.y);
        akLogika[x][y] = "u";

        for (let i = x - 1 >= 0 ? x - 1 : 0; i < (akLogika.length - 1 > x ? x + 2 : akLogika.length); i++) {
            for (let j = y - 1 >= 0 ? y - 1 : 0; j < (akLogika[0].length - 1 > y ? y + 2 : akLogika[0].length); j++) {
                if (akLogika[i][j] == 0) {
                    ford.push({ x: i, y: j });
                }
                ak.children[i].children[j].style.backgroundColor = "green";
                ak.children[i].children[j].innerHTML = akLogika[i][j] != 0 && akLogika[i][j] != "u" ? innerHTML = akLogika[i][j] : "";
                ak.children[i].children[j].removeEventListener("click", egyfel);
                ak.children[i].children[j].removeEventListener("contextmenu", jelol);
            }
            //break;

        }
    }

}

