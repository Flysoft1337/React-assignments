import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// 演示 useEffect vs useLayoutEffect 的执行时机
// useEffect：浏览器绘制之后才跑，会先看到 0 再瞬间变成随机值，可能闪烁
// useLayoutEffect：DOM 更新后、绘制之前同步跑，用户看不到中间状态
export default function EffectDemo() {
  return (
    <div>
      <h2>useLayoutEffect vs useEffect</h2>
      <p>点按钮重置 value 为 0，effect 会立刻把它改成随机数。观察是否闪烁。</p>
      <div style={{ display: 'flex', gap: 24 }}>
        <Box title="useEffect（异步，可能闪 0）" useLayout={false} />
        <Box title="useLayoutEffect（同步，无闪烁）" useLayout={true} />
      </div>
      <details style={{ marginTop: 16 }}>
        <summary>原理简述</summary>
        <pre>{`渲染流程：
  1. React 计算新的 DOM
  2. 提交到真实 DOM
  3. useLayoutEffect 在这里同步执行（浏览器还没绘制）
  4. 浏览器绘制
  5. useEffect 在这里异步执行（用户已经看到画面）

所以读 DOM 尺寸、做布局修正应该用 useLayoutEffect。`}</pre>
      </details>
    </div>
  )
}

function Box({ title, useLayout }: { title: string; useLayout: boolean }) {
  const [value, setValue] = useState(0)
  const renderCount = useRef(0)
  // eslint-disable-next-line react-hooks/refs -- 演示渲染次数，故意在 render 阶段累加
  renderCount.current++

  // 注意：两个 hook 不能条件调用，所以分别写然后内部判断
  useEffect(() => {
    if (!useLayout && value === 0) {
      // 故意 sleep 一下放大闪烁
      const start = performance.now()
      // eslint-disable-next-line no-empty -- 忙等阻塞，演示用
      while (performance.now() - start < 50) {}
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 演示 effect 内 setState 引起的级联渲染
      setValue(Math.floor(Math.random() * 1000))
    }
  }, [value, useLayout])

  useLayoutEffect(() => {
    if (useLayout && value === 0) {
      const start = performance.now()
      // eslint-disable-next-line no-empty -- 忙等阻塞，演示用
      while (performance.now() - start < 50) {}
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 演示 effect 内 setState 引起的级联渲染
      setValue(Math.floor(Math.random() * 1000))
    }
  }, [value, useLayout])

  return (
    <div style={{ border: '1px solid #aaa', padding: 12, flex: 1 }}>
      <h3>{title}</h3>
      <p>value = <b style={{ fontSize: 20 }}>{value}</b></p>
      <p style={{ color: '#888', fontSize: 12 }}>
        {/* eslint-disable-next-line react-hooks/refs -- 演示用，render 阶段读 ref */}
        render 次数：{renderCount.current}
      </p>
      <button onClick={() => setValue(0)}>重置为 0</button>
    </div>
  )
}
