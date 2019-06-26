const localStorage = window.localStorage
const USER_KEY = 'user-info'
//export 用来支持导出多个成员
// 优点：按需加载，需要谁才加载谁，打包（npm run build）的时候，
// 对于没有使用的不会打包

// export function getUser () {
//   return JSON.parse(localStorage.getItem(USER_KEY))
// }

// export function saveUser (data) {
//   localStorage.setItem(USER_KEY, JSON.stringify(data))
// } 

// export function removeUser () {
//   localStorage.removeItem(USER_KEY)
// }

export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

export function saveUser (data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export function removeUser () {
  localStorage.removeItem(USER_KEY)
}