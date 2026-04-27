# React Router 路由演示

Vite + React 19 + TypeScript，使用 react-router v7。

## 功能

- **二级路由** — 仪表盘（概览/设置）、用户中心（个人资料/账号设置）
- **路由守卫** — 基于 Token 鉴权，未登录自动跳转登录页
- **路由监听** — watch 路由变化，记录每次跳转的 from → to
- **独立路由配置** — 集中管理在 `src/router/routes.ts`

## 路由结构

```
/                         首页（公开）
/login                    登录页（公开）
/dashboard                仪表盘 - 概览（需登录）
/dashboard/settings       仪表盘 - 设置（需登录）
/user                     用户中心 - 个人资料（需登录）
/user/account             用户中心 - 账号设置（需登录）
```

## Token 机制

- 进入页面自动生成游客 Token（`guest_xxx`）
- 登录后通过 SHA-256 哈希（用户名 + 密码）生成用户 Token
- 路由守卫判断 Token 是否为游客来决定放行

## 运行

```bash
npm install
npm run dev
```
