// Author is Michelle Beshears
// This particular section is dedicated to the NEWS ARTICLES part of the project.


import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';
import '../../Articles/articlesPage.scss';

const fireBaseUrl = apiKeys.firebaseKeys.databaseURL;
const getAllArticlesFromDb = () => new Promise((resolve, reject) => {
  axios.get(`${fireBaseUrl}/articles.json`)
    .then((results) => {
      const allArticlesObject = results.data;
      const allArticlesArray = [];
      if (allArticlesObject !== null) {
        Object.keys(allArticlesObject).forEach((articleId) => {
          const newArticle = allArticlesObject[articleId];
          newArticle.id = articleId;
          allArticlesArray.push(newArticle);
        });
      }
      resolve(allArticlesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleArticle = articleId => new Promise((resolve, reject) => {
  axios.get(`${fireBaseUrl}/articles/${articleId}.json`)
    .then((result) => {
      const singleArticle = result.data;
      singleArticle.id = articleId;
      resolve(singleArticle);
    })
    .catch((error) => {
      reject(error);
    });
});


const getAllArticles = articleId => new Promise((resolve, reject) => {
  axios.get(`${fireBaseUrl}/articles.json`)
    .then((result) => {
      const singleArticle = result.data;
      singleArticle.id = articleId;
      resolve(singleArticle);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteArticles = articleId => axios.delete(`${fireBaseUrl}/articles/${articleId}.json`);

const addNewArticle = articleOBject => axios.post(`${fireBaseUrl}/articles.json`, JSON.stringify(articleOBject));

const updateArticles = (articleObject, articleId) => axios.put(`${fireBaseUrl}/articles/${articleId}.json`, JSON.stringify(articleObject));

export default {
  getAllArticlesFromDb,
  getAllArticles,
  deleteArticles,
  addNewArticle,
  updateArticles,
  getSingleArticle,
};
