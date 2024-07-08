// const API_KEY = `d87115fdbe2240cb8187821a25a1fe4b`;
let news = [];
const getLatestNews = async () => {
  //   const url = new URL(
  //     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  //   );
  let url = `https://knn-newyorktimes.netlify.app/top-headlines`;
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("rrr", news);
};

getLatestNews();
