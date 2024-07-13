// const API_KEY = `d87115fdbe2240cb8187821a25a1fe4b`;
let newsList = [];
const menus1 = document.querySelectorAll(".menus button");
const menus2 = document.querySelectorAll(".side-menu-list button");
const menus = [...menus1, ...menus2];

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
);
// let url = new URL(
//   `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
// );

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const fetchNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("검색 결과가 없습니다.");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
    document.querySelector(".pagination").innerHTML = ""; // 검색 결과가 없을 시 페이지네이션이 사라짐
  }
};

const getLatestNews = async () => {
  page = 1;
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  // );
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  await fetchNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();

  page = 1;
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  // );
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
  );

  await fetchNews();
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
  page = 1;
  console.log("keyword", keyword);
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  // );
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
  );
  page = 1;
  // 검색할 때 모든 메뉴 버튼에서 active 클래스를 제거합니다.
  menus.forEach((menu) => menu.classList.remove("active"));
  await fetchNews();
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
                <div class="col-lg-8 article-main">
                    <div class="title-description">
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
                    </div>
                    <div class="source-moment">
                        ${news.source.name || "알수없음"} * 입력 ${moment(
        news.publishedAt
      ).format("YYYY.MM.DD. h:mm A")}
                    </div>
                </div>
            </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);
  const totalPages = Math.ceil(totalResults / pageSize);
  let lastPage = pageGroup * 5;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4;

  let paginationHTML = ``;

  if (page > 1) {
    paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
  <a class="page-link">&lt;&lt;</a>
  </li>
  <li class="page-item" onclick="moveToPage(${
    page - 1
  })"><a class="page-link">&lt;</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  if (page < totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${
      page + 1
    })"><a class="page-link">&gt</a></li>
  <li class="page-item" onclick="moveToPage(${totalPages})">
                        <a class="page-link">&gt;&gt;</a>
                       </li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;
  fetchNews(url);
};
getLatestNews();

// 사이드 메뉴 보이고 숨기기
const openNav = () => {
  document.getElementById("mySidenav").style.width = "300px";
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

//logo 클릭시 첫화면으로
const headLine = document.querySelector(".logo-box svg");
headLine.addEventListener("click", function (event) {
  getLatestNews();
  menus.forEach((menu) => menu.classList.remove("active"));
});

//메인 메뉴(menus)와 사이드 메뉴(side-menu-list)가 동시에 호버 스타일이 유지
menus.forEach((menu) => {
  menu.addEventListener("mouseenter", () => {
    menu.classList.add("hover");
    const correspondingSideMenu = document.querySelector(
      `.side-menu-list button[data-category="${menu.getAttribute(
        "data-category"
      )}"]`
    );
    if (correspondingSideMenu) {
      correspondingSideMenu.classList.add("hover");
    }
  });

  menu.addEventListener("mouseleave", () => {
    menu.classList.remove("hover");
    const correspondingSideMenu = document.querySelector(
      `.side-menu-list button[data-category="${menu.getAttribute(
        "data-category"
      )}"]`
    );
    if (correspondingSideMenu) {
      correspondingSideMenu.classList.remove("hover");
    }
  });

  // 클릭 시 active 클래스 추가
  menu.addEventListener("click", (event) => {
    const category = event.target.getAttribute("data-category");
    menus.forEach((m) => {
      if (m.getAttribute("data-category") === category) {
        m.classList.add("active");
      } else {
        m.classList.remove("active");
      }
    });

    sideMenus.forEach((sm) => {
      if (sm.getAttribute("data-category") === category) {
        sm.classList.add("active");
      } else {
        sm.classList.remove("active");
      }
    });

    // API 호출 등 원하는 기능 실행
    getNewsByCategory(event);
  });
});
