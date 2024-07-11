const API_KEY = `d87115fdbe2240cb8187821a25a1fe4b`;
let newsList = [];
const menus1 = document.querySelectorAll(".menus button");
const menus2 = document.querySelectorAll(".side-menu-list button");
const menus = [...menus1, ...menus2];

menus.forEach((meun) =>
  meun.addEventListener("click", (event) => getNewsByCategory(event))
);
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  // let url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`;
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("rrr", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("catagory", category);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("ddd", data);
  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${
                      news.urlToImage || "img/Noimage.jpg"
                    }" onerror="this.onerror=null; this.src='img/Noimage.jpg';">
                </div>
                <div class="col-lg-8">
                    <h2>
                        ${news.title}
                    </h2>
                    <p>
                    ${
                      news.description == null || news.description == ""
                        ? "내용없음"
                        : news.description.length > 200
                        ? news.description.substring(0, 200) + "..."
                        : news.description
                    }
                    </p>
                    <div>
                        ${news.source.name || "내용없음"} * ${moment(
        news.publishedAt
      ).format("LLL")}; 
                    </div>
                </div>
            </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

// 사이드 메뉴 보이고 숨기기
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

// 검색창 보이고 숨기기
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
