const params = new URLSearchParams(window.location.search);
const pexelId = params.get("pexelId");
console.log(pexelId);
window.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.pexels.com/v1/photos/" + pexelId, {
    method: "GET",
    headers: { Authorization: "QdjyaWGnzsPWwNMyaSGbDR4z0ZIZ6tY2WIijaotxKtYiyTs7jXn8qNe5" },
  })
    .then((resp) => resp.json())
    .then((pictureObj) => {
      console.log(pictureObj);
      const img = document.createElement("img");
      img.src = pictureObj.src.original;
      img.style = "max-width:100%";
      img.alt = pictureObj.alt;
      document.body.appendChild(img);
      document.body.style.padding = "2rem";
      document.body.style.backgroundColor = pictureObj.avg_color;
    });
});
