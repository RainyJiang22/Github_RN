import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk'
import reducers from '../reducer';

const logger = store => next => action =>{
   if (typeof  action === 'function'){
       console.log('dipatching a function');
   }else{
       console.log('dipatching',action);
   }
   const result = next(action);
   console.log('nextState',store.getState());
   return result;
};

//中间件 - React Navigation v7不再需要navigation middleware
const middlewares = [
    logger,
    thunk,
];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
