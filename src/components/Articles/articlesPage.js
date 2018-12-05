import $ from 'jquery';
import './articlesPage.scss';
import articlesData from '../Helpers/Data/articlesData';
import authHelpers from '../Helpers/authHelpers';

// PRINT ARTICLE TO PAGE
const printAllArticles = (allArticlesArray) => {
  let domString = `
    <h3>Articles:</h3>
  `;

  allArticlesArray.forEach((article) => {
    domString += `
    <div class="news-articles-builder">
      <h5 class="article-title">&#9758 ${article.title}</h5>
      <p class="article-synopsis">${article.synopsis}</p>
      <a class="article-url" href="${article.url}" target="_blank">Click here to view the article</a>
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


// FORM TO CREATE A NEW ARTICLE

const formBuilder = (article) => {
  const form = `
  <div class="article-form-group">
    <label for="form-article-name">Article Title:</label>
    <input type="text" class="title-input" value="${article.title}" id="title-input-form" placeholder="Coffee makers may contain mold!">
    <label form="form-article-synopsis">Synopsis:</label>
    <input type="text" class="synopsis-input" value="${article.synopsis}" id="synopsis-input-form" placeholder="Keep away from the plastic in coffee makers, especially Keurigs!">
    <label form="form-article-url">Synopsis:</label>
    <input type="text" class="url-input" value="${article.url}" id="url-input-form" placeholder="www.google.com">
  </div>
  `;
  console.log('formsomethin;kajshfkj');
  $('#article-section').html(form);
};

// const buildArticleForm = () => {
//   const emptyArticle = {
//     article: '',
//   };
//   let domString = '<h3>Add New Article</h3>';
//   domString += formBuilder(emptyArticle);
//   domString += '<button id="add-article" class="btn btn-info btn-sm">Save New Article</button>';
//   $('#article-section').html(domString);
// };

// const addArticle = () => {
//   articlesData.addNewArticle()
//     .then(() => {
//       $('#article-section').show();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // CLICK EVENTS

// $('body').on('click', '#add-article', addArticle);

const initializeArticles = () => {
  articleComponent();
  formBuilder();
};

export default { initializeArticles };
