import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger';

// createLogger 是 redux-logger 其中一个配置方法
const logger = createLogger({
	diff: true,		// 输出不同
	// collapsed: true	//折叠形式
})

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(thunk,promiseMiddleware,logger))
  return store
}