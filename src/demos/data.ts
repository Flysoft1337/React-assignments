// 演示用的初始数据，集中在这里管理

// 数组：一组数字
export const initialList: number[] = [1, 2, 3, 5, 8, 13, 21]

// 对象：一个用户档案，带嵌套结构和数组字段
export interface User {
  name: string
  age: number
  email: string
  addr: {
    city: string
    street: string
    zip: string
  }
  hobbies: string[]
}

export const initialUser: User = {
  name: '小明',
  age: 18,
  email: 'xiaoming@example.com',
  addr: {
    city: '北京',
    street: '中关村大街 27 号',
    zip: '100080',
  },
  hobbies: ['看书', '打篮球', '弹吉他'],
}

// 待办列表：演示带 id 的对象数组
export interface Todo {
  id: number
  text: string
  done: boolean
}

export const initialTodos: Todo[] = [
  { id: 1, text: '写 React 作业', done: true },
  { id: 2, text: '复习 hooks', done: false },
  { id: 3, text: '整理笔记', done: false },
  { id: 4, text: '提交到 GitHub', done: false },
]

// 城市候选，用于切换嵌套字段
export const cities: string[] = ['北京', '上海', '广州', '深圳', '杭州', '成都']
