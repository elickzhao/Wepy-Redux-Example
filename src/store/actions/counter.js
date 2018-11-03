import {
	ASYNC_INCREMENT,
	GET_DATA,
	ADD_ITEM,
	INCREMENT,
	DECREMENT
} from '../types/counter'
import {
	createAction
} from 'redux-actions'

/**
 * [wepy自带请求事例 redux-promise 配合 redux-actions 来使用 完成一个建立 异步action的操作]
 * @param  {[const]}   ASYNC_INCREMENT 	[reduce名称]
 * @param  {Function} ()              	[description]
 * @return {[Promise]}                  [返回一个Promise对象]
 */
export const asyncInc = createAction(ASYNC_INCREMENT, () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(1)
		}, 1000)
	})
})


/**
 * [这是当时在弄传参时遇到的一些情况 因为对es6还不是 那么熟悉]
 * @param  {[string]} item [字符串参数]
 * @return {[type]}        [description]
 */
export const AddItem = createAction(
	ADD_ITEM,
	item => item
	// 加括号这样写 好像就是 直接return 因为是个函数 下面这个是return个对象 上面直接是return参数  简化了{} 这个函数体 好像明白了 因为对象的和函数体都是{} 所以加个括号表示返回的是对象
	// item => ({
	// 	item
	// })
	// 
	// item => ({item,dd:'aa'})    // out: {itme: "dd", dd: "aa"}  会把参数名作为下标
);


/**
 * [getDataOld 这是手写版 不利用redux-actions生成action 不过这个异步也必须是配合redux-promise完成的 还有一点就是这是最正规的action写法 返回的是个对象]
 * @param  {Number} id [参数]
 * @return {[object]}    [返回的是对象不是函数 这个函数是action creator 用于生成action]
 */
export const getDataOld = function(id = 1) {
	//console.log('---->',id)
	return {
		type: GET_DATA,
		payload: new Promise(resolve => {
			setTimeout(() => {
				resolve(parseInt(id))
			}, 1000)
		})
	}
}

//这里是由thunk 控制的  主要这里返回的是函数 并不是对象 上面那个是标准写法 返回的是个对象 因为action本应不涉及操作步骤
//thunk可以做到 loading效果 但是唯一缺点就是代码太多 还有就是不能配合 createAction 一起使用
export const getData = function(id = 1) {
	//console.log('---->',id)
	// 只有使用thunk插件才能传入 dispatch 参数 和 getState 方法
	return (dispatch) => {
		dispatch({
			type: INCREMENT,
			payload: 2
		})
		setTimeout(() => {
			dispatch({
				type: DECREMENT,
				payload: 1
			})
		}, 1000)
	}

	// 标准api请求写法 
	// api.getData(id) //注：本文所有示例的api.getData都返回promise对象
	// 	.then(response => {
	// 		//这里加上关闭loading
	// 		dispatch({
	// 			type: GET_DATA_SUCCESS,
	// 			payload: response
	// 		})
	// 	})
	// 	.catch(error => {
	// 		dispatch({
	// 			type: GET_DATA_FAILED,
	// 			payload: error
	// 		})
	// 	})
}

// 这是promiseMiddleware配合createAction 一起使用 唯一缺点是没法加 loading 开启和关闭 处理错误是在 reduce 里面 不是象thunk在action里
// 不过幸好小程序好像这么用意义不大  因为速度很快 基本无法显示loading  而貌似可以通过小程序自己解决
// 还有一点是 redux 能使用的状态好像也不多 因为只有多组件公用的才需要 比如购物车和收货地址 如果不是的话好像没必要加里面 
// 
/**
 * [redux-promise 配合 redux-action 带传递参数的 而且返回的是错的例子]
 * @param  {[type]}   GET_DATA [description]
 * @param  {Function} (id      [description]
 * @return {[type]}            [description]
 */
export const getDataNew = createAction(GET_DATA, (id =1) => {
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			// resolve(id)
			// resolve(parseInt(id))	// 这是为了直接使用的时候 传来的是 字符串  转换下类型
			 reject("你错了............")
		}, 1000)
	})
})