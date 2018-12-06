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

const modalFormBuilder = (article) => {
  // console.log('form builder', articlesArray);
  const domString = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#articleModalCenter">Add A New Article</button>
<div class="modal fade" id="articleModalCenter" tabindex="-1" role="dialog" aria-labelledby="articleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="articleModalCenterTitle">Complete the form below:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body">
          <label for="form-article-name">Article Title:</label>
          <input type="text" class="title-input" value="${article.title} id="title-input-form" placeholder="Coffee makers may contain mold!">
          <label form="form-article-synopsis">Synopsis:</label>
          <input type="text" class="synopsis-input" value="${article.synopsis} id="synopsis-input-form" placeholder="Keep away from the plastic in coffee makers, especially Keurigs!">
          <label form="form-article-url">URL:</label>
          <input type="text" class="url-input" value="${article.url} id="url-input-form" placeholder="www.google.com">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" id="save-new-article" class="btn btn-primary">Save changes</button>
        </div>
    </div>
  </div>
</div>
    `;
  $('#modal-section').html(domString);
};

const formComponent = () => {
  const uid = authHelpers.getCurrentUid();
  articlesData.getAllArticlesFromDb(uid)
    .then((articles) => {
      modalFormBuilder(articles);
    })
    .catch((error) => {
      console.error('error in formComponent', error);
    });
};

const gettingArticleFromForm = () => {
  const article = {
    title: $('#title-input-form').val(),
    synopsis: $('#synopsis-input-form').val(),
    url: $('#url-input-form').val(),
    uid: authHelpers.getCurrentUid(),
  };
  return article;
};

const addNewArticle = () => {
  const newArticle = gettingArticleFromForm()
  articlesData.addNewArticle(newArticle)
    .then(() => {
      formComponent();
    })
    .catch((error) => {
      console.log('error in addNewArticle', error);
    });
};

// CLICK EVENTS
$('body').on('click', '#save-new-article', addNewArticle);

const initializeArticles = () => {
  articleComponent();
  // formBuilder();
  formComponent();
};

export default { initializeArticles };
