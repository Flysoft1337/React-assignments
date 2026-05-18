import { useState } from 'react'
import { cities, initialList, initialTodos, initialUser, type Todo } from './data'

// 演示数组和对象在 useState 里必须用新引用才会触发更新
// push / 直接改字段 不会重新渲染，因为 React 用 Object.is 比较，引用没变就跳过
export default function StateDemo() {
  return (
    <div>
      <h2>array & Object 的不可变更新</h2>
      <ArrayDemo />
      <hr />
      <ObjectDemo />
      <hr />
      <TodoDemo />
    </div>
  )
}

function ArrayDemo() {
  const [list, setList] = useState<number[]>(initialList)

  // 错误示范：原地 push，引用没变，不触发渲染
  const wrongPush = () => {
    list.push(list.length + 1)
    setList(list)
  }

  // 正确：返回新数组
  const rightPush = () => {
    setList([...list, list.length + 1])
  }

  const remove = (i: number) => {
    setList(list.filter((_, idx) => idx !== i))
  }

  const update = (i: number) => {
    setList(list.map((n, idx) => idx === i ? n * 10 : n))
  }

  return (
    <div>
      <h3>数组</h3>
      <p>list = {JSON.stringify(list)}</p>
      <button onClick={wrongPush}>错误：list.push</button>
      <button onClick={rightPush}>正确：[...list, x]</button>
      <button onClick={() => remove(0)}>删第一个</button>
      <button onClick={() => update(0)}>第一个 ×10</button>
    </div>
  )
}

function ObjectDemo() {
  const [user, setUser] = useState(initialUser)

  // 错误示范：直接改字段
  const wrongEdit = () => {
    // eslint-disable-next-line react-hooks/immutability -- 故意演示错误写法
    user.age++
    setUser(user)
  }

  // 正确：展开成新对象
  const rightEdit = () => {
    setUser({ ...user, age: user.age + 1 })
  }

  // 嵌套对象：在 cities 列表里循环切换
  const nextCity = () => {
    const idx = cities.indexOf(user.addr.city)
    const next = cities[(idx + 1) % cities.length]
    setUser({ ...user, addr: { ...user.addr, city: next } })
  }

  // 嵌套数组：在数组字段里增删
  const addHobby = () => {
    setUser({ ...user, hobbies: [...user.hobbies, '新爱好' + (user.hobbies.length + 1)] })
  }

  const removeHobby = (i: number) => {
    setUser({ ...user, hobbies: user.hobbies.filter((_, idx) => idx !== i) })
  }

  return (
    <div>
      <h3>对象</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={wrongEdit}>错误：user.age++</button>
      <button onClick={rightEdit}>正确：&#123;...user, age+1&#125;</button>
      <button onClick={nextCity}>切换城市（嵌套对象）</button>
      <button onClick={addHobby}>添加爱好</button>
      {user.hobbies.map((h, i) => (
        <button key={i} onClick={() => removeHobby(i)}>删 {h}</button>
      ))}
    </div>
  )
}

// 对象数组：每条 todo 都是对象，更新某条要返回新数组 + 新对象
function TodoDemo() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const toggle = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const remove = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const add = () => {
    const id = Math.max(0, ...todos.map(t => t.id)) + 1
    setTodos([...todos, { id, text: '任务 ' + id, done: false }])
  }

  return (
    <div>
      <h3>对象数组（待办）</h3>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none', marginLeft: 6 }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)} style={{ marginLeft: 8 }}>删</button>
          </li>
        ))}
      </ul>
      <button onClick={add}>添加</button>
    </div>
  )
}
