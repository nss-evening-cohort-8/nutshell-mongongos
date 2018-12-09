// Author is Michelle Beshears
// This particular section is dedicated to the NEWS ARTICLES part of the project.


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
      <button type="button" id="delete-article-button" class="btn btn btn-sm" data-delete-id=${article.id}>X</button>
      <button type="button" id="edit-article-button" class="btn btn btn-sm edit-btn" data-edit-id=${article.id}>Edit</button>
      <h5 class="article-title">&#9758 ${article.title}</h5>
      <p class="article-synopsis">${article.synopsis}</p>
      <a class="article-url" href="${article.url}" target="_blank">Click here to view the article</a>
    </button>
    <hr class="my-4">
    <br>
    <div id="${article.id}"></div>
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

const modalFormBuilder = () => {
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
          <input type="text" class="form-control" id="title-input-form" placeholder="Coffee makers may contain mold!">
          <label form="form-article-synopsis">Synopsis:</label>
          <input type="text" class="form-control" id="synopsis-input-form" placeholder="Keep away from the plastic in coffee makers, especially Keurigs!">
          <label form="form-article-url">URL:</label>
          <input type="text" class="form-control" id="url-input-form" placeholder="www.google.com">
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

const articlesPage = () => {
  const uid = authHelpers.getCurrentUid();
  articlesData.getAllArticlesFromDb(uid)
    .then(() => {
      articleComponent();
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
  const newArticle = gettingArticleFromForm();
  articlesData.addNewArticle(newArticle)
    .then(() => {
      articlesPage();
      $('.modal').modal('hide');
    })
    .catch((error) => {
      console.log('error in addNewArticle', error);
    });
};


// DELETE ARTICLES

const deleteArticle = (e) => {
  const articleToDelete = e.target.dataset.deleteId;
  articlesData.deleteArticles(articleToDelete)
    .then(() => {
      articleComponent();
    })
    .catch((error) => {
      console.error('error in deleteArticles', error);
    });
};

// EDIT ARTICLES

const editFormBuilder = (article) => {
  const form = `
  <div class="form-group">
    <label for="form-article-title">Title:</label>
    <input type="text" class="form-control" value="${article.title}" id="title-input-form">
  </div>
  <div class="form-group">
    <label for="form-article-synopsis">Synopsis:</label>
    <input type="text" class="form-control" value="${article.synopsis}" id="synopsis-input-form">
  </div>
  <div class="form-group">
    <label for="form-article-url">Url:</label>
    <input type="text" class="form-control" value="${article.url}" id="url-input-form">
  </div>
  `;
  return form;
};

const showEditForm = (e) => {
  const articleToEdit = e.target.dataset.editId;
  articlesData.getSingleArticle(articleToEdit)
    .then((singleArticle) => {
      let domString = '<h2>Edit Article</h2>';
      domString += editFormBuilder(singleArticle);
      domString += `<button id="article-to-edit" data-edit-id=${singleArticle.id} class="btn btn btn-sm edit">Save Article Change</button>`;
      $(`#${articleToEdit}`).html(domString);
    })
    .catch((error) => {
      console.log('error in showing the edit form', error);
    });
};

const updateArticle = (e) => {
  const updatedArticle = gettingArticleFromForm();
  const articleId = e.target.dataset.editId;
  articlesData.updateArticles(updatedArticle, articleId)
    .then(() => {
      articlesPage();
      $('#article-section').show();
    })
    .catch((error) => {
      console.log('error in updateArticle', error);
    });
};

// CLICK EVENTS
$('body').on('click', '#save-new-article', addNewArticle);
$('body').on('click', '#delete-article-button', deleteArticle);
$('body').on('click', '#edit-article-button', showEditForm);
$('body').on('click', '#article-to-edit', updateArticle);

const initializeArticles = () => {
  articleComponent();
  articlesPage();
  modalFormBuilder();
};

export default { initializeArticles, printAllArticles };
