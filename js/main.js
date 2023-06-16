const list = document.querySelector(".list");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pageText = document.querySelector(".page");
const cards = document.getElementsByClassName("card");
const searchInp = document.querySelector(".search");
const radios = document.querySelectorAll('input[type="radio"]');

let page = 1;
let pageTotalCount = 1;

let search = "";
let filter = "";
async function getData() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}&status=${filter}`
  );
  if (!response.ok) {
    searchInp.style.outlineColor = "red";
  } else {
    searchInp.style.outlineColor = "";
  }
  const data = await response.json();
  pageTotalCount = data.info.pages;
  return data;
}

// !
next.addEventListener("click", (e) => {
  if (page >= pageTotalCount) {
    return;
  }
  page++;
  render();
});

prev.addEventListener("click", (e) => {
  if (page <= 1) {
    return;
  }
  page--;
  render();
});

// !

render();
async function render() {
  const character = await getData();
  list.innerHTML = "";
  character.results.forEach((item) => {
    list.innerHTML += `
    <div id='${item.status + "," + item.name}' class="card">
        <h2>${item.name}</h2>
        <div class="img">
          <img
            src="${item.image}"
            alt=""
          />
        </div>
    </div>
  `;
  });

  pageText.innerText = `${page} | ${pageTotalCount}`;

  for (let card of cards) {
    card.addEventListener("mouseenter", (e) => {
      const [status, name] = card.id.split(",");
      e.target.children[0].innerText = status;
    });

    card.addEventListener("mouseleave", (e) => {
      const [status, name] = card.id.split(",");
      e.target.children[0].innerText = name;
    });
  }
}

searchInp.addEventListener("input", () => {
  search = searchInp.value;
  page = 1;
  render();
});

// !

radios.forEach((item) => {
  item.addEventListener("change", (e) => {
    filter = e.target.id;

    if (e.target.id == "all") {
      filter = "";
    }

    render();
  });
});
