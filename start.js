const loadBtn = document.getElementById("loadBtn");
const row = document.getElementById("row");

const fetchImg = () => {
  fetch("https://api.pexels.com/v1/search?query=beach", {
    method: "GET",
    headers: { Authorization: "QdjyaWGnzsPWwNMyaSGbDR4z0ZIZ6tY2WIijaotxKtYiyTs7jXn8qNe5" },
  })
    .then((respond) => {
      if (respond.ok) {
        // console.log(respond);
        return respond.json();
      } else {
        throw Error("Dati non ricevuti");
      }
    })
    .then((imgObj) => {
      console.log("imgObj", imgObj);

      const photos = imgObj.photos;

      photos.forEach((img) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const divImg = document.createElement("img");
        divImg.classList.add("bd-placeholder-img", "card-img-top");
        divImg.setAttribute("src", `${img.src.original}`);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = img.photographer;

        const p = document.createElement("p");
        p.classList.add("card-text");
        p.innerText = img.alt;

        const flex = document.createElement("div");
        flex.classList.add("d-flex", "justify-content-between", "align-items-center");

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group");

        const btnView = document.createElement("button");
        btnView.classList.add("btn", "btn-sm", "btn-outline-secondary");
        btnView.setAttribute("type", "button");
        btnView.innerText = "View";

        const btnHide = document.createElement("button");
        btnHide.classList.add("btn", "btn-sm", "btn-outline-secondary");
        btnHide.setAttribute("type", "button");
        btnHide.innerText = "Hide";

        const small = document.createElement("small");
        small.classList.add("text-muted");
        small.innerText = img.id;

        btnGroup.appendChild(btnView);
        btnGroup.appendChild(btnHide);
        flex.appendChild(btnGroup);
        flex.appendChild(small);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(flex);
        card.appendChild(divImg);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });
    });
};

loadBtn.addEventListener("click", (event) => {
  fetchImg();
});
