import * as ActionTypes from './ActionTypes';
// import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

// ACtion creator for add comment
export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});


// ACtion creator for post comments
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }

  newComment.date = new Date().toISOString();
  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
    .then(resp => {
      if(resp.ok){
        return resp;
      }
      else{
        var error = new Error('Error ' + resp.status + ': ' + resp.statusText);
        error.resp = resp;
        throw error;
      }
    })
    .then(resp => resp.json())
    .then(resp => dispatch(addComment(resp)))
    .catch(err => {
      console.log('Post comments ',  err.message)
      alert('An Error Occured!')
    });
}


// Action creators for dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
    .then(resp => {
      if(resp.ok){
        return resp;
      }
      else{
        var error = new Error('Error ' + resp.status + ': ' + resp.statusText);
        error.resp = resp;
        throw error;
      }
    })
    .then(resp => resp.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// Action creators for comments

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
    .then(resp => {
      if(resp.ok){
        return resp;
      }
      else{
        var error = new Error('Error ' + resp.status + ': ' + resp.statusText);
        error.resp = resp;
        throw error;
      }
    })
    .then(resp => resp.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// Action creators for promotions added

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    // By using json server
    return fetch(baseUrl + 'promotions')
    .then(resp => {
      if(resp.ok){
        return resp;
      }
      else{
        var error = new Error('Error ' + resp.status + ': ' + resp.statusText);
        error.resp = resp;
        throw error;
      }
    })
    .then(resp => resp.json())
    .then(promotions => dispatch(addPromos(promotions)))
    .catch(err => dispatch(promosFailed(err.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});


// Action types for leaders


export const fetchLeaders = () => (dispatch) => {
    // dispatch(leadersLoading(true));

    // By using json server
    return fetch(baseUrl + 'leaders')
    .then(resp => {
      if(resp.ok){
        return resp;
      }
      else{
        var error = new Error('Error ' + resp.status + ': ' + resp.statusText);
        error.resp = resp;
        throw error;
      }
    })
    .then(resp => resp.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(err => dispatch(leadersFailed(err.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


// To post feedback

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  }

  newFeedback.date = new Date().toISOString();
  return fetch(baseUrl + 'feedback', {
    method: 'POST',
    body: JSON.stringify(newFeedback),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
    .then(resp => {
      if(resp.ok){
        return resp;
      }
      else{
        var error = new Error('Error ' + resp.status + ': ' + resp.statusText);
        error.resp = resp;
        throw error;
      }
    })
    .then(resp => resp.json())
    .then(resp => dispatch(addFeedback(resp)))
    .catch(err => {
      console.log('Post feedback ',  err.message)
      alert('An Error Occured!')
    });
}
