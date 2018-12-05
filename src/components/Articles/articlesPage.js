import $ from 'jquery';
import './articlesPage.scss';
import articlesData from '../Helpers/Data/articlesData';
import authHelpers from '../Helpers/authHelpers';


const printAllArticles = (allArticlesArray) => {
  let domString = '';
  allArticlesArray.forEach((article) => {
    domString += `
    <div class="news-articles-builder">
      <h5 class="article-title">&#9758 ${article.title}</h5>
      <p class="article-synopsis">${article.synopsis}</p>
      <a class="article-url" href="${article.url}">Click here to view the article</a>
    </div>
    <hr class="my-4">
    <br>
    `;
    $('#article-section').html(domString);
  });
};

const articleComponent = () => {
  const uid = authHelpers.getCurrentUid();
  articlesData.getAllArticlesFromDb(uid)
    .then((allArticlesArray) => {
      printAllArticles(allArticlesArray);
    })
    .catch((error) => {
      console.error('error in articleComponent', error);
    });
};

export default { articleComponent };
