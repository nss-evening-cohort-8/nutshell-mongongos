import $ from 'jquery';
import './articlesPage.scss';
import articlesData from './articlesData';
import authHelpers from '../Helpers/authHelpers';


const printAllArticles = (allArticlesArray) => {
  let domString = '';
  console.log(allArticlesArray);
  allArticlesArray.forEach((article) => {
    domString += `
    <div class="news-articles-builder">
      <h1 class="article-section">Articles</h1>
      <h4 class="article-title">${article.title}</h4>
      <hr class="my-4">
      <p class="article-synopsis">${article.synopsis}</p>
      <p class="article-url" href="${article.url}">Click here to view the article</p>
    </div>
    `;
    $('article-section').html(domString);
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
