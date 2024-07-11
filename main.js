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
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
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
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  // let url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("ddd", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const searchInput1 = document.getElementById("search-input1");
  const value1 = searchInput1 ? searchInput1.value : "";

  // id가 "search-input2"인 요소의 값을 가져옵니다.
  const searchInput2 = document.getElementById("search-input2");
  const value2 = searchInput2 ? searchInput2.value : "";

  // 두 값을 합칩니다. 필요에 따라 처리 방식은 달라질 수 있습니다.
  const keyword = `${value1} ${value2}`;

  // 입력 필드의 값을 지웁니다
  if (searchInput1) {
    searchInput1.value = "";
  }

  if (searchInput2) {
    searchInput2.value = "";
  }
  console.log("keyword", keyword);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  // let url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data", data);
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

// 창 크기 변경 감지를 위한 이벤트 리스너 추가
window.addEventListener("resize", () => {
  // 현재 화면 폭 가져오기
  let windowWidth = window.innerWidth;

  // 화면 폭이 작아질 경우 검색창 닫기
  if (windowWidth <= 1024) {
    document.getElementById("input-area").style.display = "none";
  }
});

// 사이드 메뉴를 닫는 함수
const closeSideMenu = () => {
  document.getElementById("mySidenav").style.width = "0";
};

// 창 크기 변경 감지를 위한 이벤트 리스너 추가
window.addEventListener("resize", () => {
  // 현재 화면 너비 가져오기
  let windowWidth = window.innerWidth;

  // 화면 너비가 커질 경우 사이드 메뉴 닫기
  if (windowWidth > 1024) {
    // 예시로 1024px 이상일 때 사이드 메뉴 닫힘
    closeSideMenu();
  }
});

// 입력 필드에서 엔터 키를 눌렀을 때 검색
const searchInput1 = document.getElementById("search-input1");
const searchInput2 = document.getElementById("search-input2");

if (searchInput1) {
  searchInput1.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getNewsByKeyword();
    }
  });
}

if (searchInput2) {
  searchInput2.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getNewsByKeyword();
    }
  });
}
