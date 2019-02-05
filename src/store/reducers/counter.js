import {
  handleActions
} from 'redux-actions'
import {
  INCREMENT,
  DECREMENT,
  ASYNC_INCREMENT,
  GET_DATA,
  ADD_ITEM
} from '../types/counter'

export default handleActions({
  [INCREMENT](state,action) {
    console.log(parseInt(action.payload))
    let add = parseInt(action.payload) ? action.payload : 1
    return {
      ...state,
      num: state.num + add
    }
  },
  [DECREMENT](state) {
    return {
      ...state,
      num: state.num - 1
    }
  },
  [ASYNC_INCREMENT](state, action) {
    console.log('ASYNC_INCREMENT:',action)
    return {
      ...state,
      asyncNum: state.asyncNum + action.payload
    }
  },
  [ADD_ITEM](state, action) {
    return {
      ...state,
      itme:action.payload
    }
  },
  GET_DATA: {
    // handle resolve
    // {type: "ASYNC_INCREMENT", payload: "你错了............", error: true}  是这么写的 原来又是我的疏忽造成的 但是还有loading两种状态和接受数据的问题
    next:(state, action)=> {
      console.log(action,"<-------------")
      return {
        ...state,
        asyncNum: state.asyncNum + action.payload
      }
    },
    // handle reject
    throw: (state, action)=> {
      console.log(action,"------------->")
      return {
        ...state,
         error: action.payload, // error in payload
      };
    },
  }
  // [GET_DATA](state, action) {
  //   if (action.status === 'success') {
  //     // return successState
  //     console.log(action)
  //   } else {
  //     // return errorState
  //     console.log('我错了')
  //   }
  //   return {...state}
  // }
}, {
  num: 0,
  asyncNum: 0,
  itme:"",
  // error:""   // 从这里看 如果是数字的话必须初始化 如果不是的话 可以后面添加  好像有别的初始化方法 这个我再看看
})