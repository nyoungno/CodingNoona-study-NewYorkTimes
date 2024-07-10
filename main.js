// const API_KEY = `d87115fdbe2240cb8187821a25a1fe4b`;
let newsList = [];
const getLatestNews = async () => {
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  let url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`;
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("rrr", newsList);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${
                      news.urlToImage ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                    }">
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
