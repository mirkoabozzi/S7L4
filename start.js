const loadBtn = document.getElementById("loadBtn");
const loadBtn2 = document.getElementById("loadBtn2");
const row = document.getElementById("row");
const searchQuery = document.getElementById("searchQuery");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

const fetchImg = (query) => {
  fetch("https://api.pexels.com/v1/search?query=" + query, {
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

      imgObj.photos.forEach((img) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const pic = document.createElement("img");
        pic.classList.add("bd-placeholder-img", "card-img-top");
        pic.setAttribute("src", `${img.src.original}`);

        pic.addEventListener("click", (event) => {
          window.location.assign("./detail.html?pexelId=" + img.id);
        });

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = img.photographer;

        h5.addEventListener("click", (event) => {
          window.location.assign("./detail.html?pexelId=" + img.id);
        });

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
        btnView.setAttribute("data-bs-toggle", "#modal");

        btnView.addEventListener("click", () => {
          modalBody.innerHTML = "";
          const modalImg = document.createElement("img");
          modalImg.setAttribute("src", img.src.tiny);
          modalBody.appendChild(modalImg);
          console.log(modalBody);
        });

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
        card.appendChild(pic);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  loadBtn.addEventListener("click", (event) => {
    row.innerHTML = "";
    fetchImg("beach");
  });

  loadBtn2.addEventListener("click", (event) => {
    row.innerHTML = "";
    fetchImg("mountain");
  });

  searchQuery.addEventListener("change", (event) => {
    console.log(event);
    row.innerHTML = "";
    fetchImg(event.target.value);
  });
});
