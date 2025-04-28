/*
 * 路由实例存储文件，请勿轻易添加其他代码，防止出现 HMR 或其他问题
 */
import type {Router, RouterHistory} from 'vue-router';
import {createRouter as createVueRouter, createWebHistory, RouterOptions} from 'vue-router';
// 新
//import {AppRouteRecordRaw} from "@/router/types";


export let router: Router = null as unknown as Router;

export function setRouter(r: Router) {
  router = r
}

let webHistory: Nullable<RouterHistory> = null;
//export let webHistory: Nullable<RouterHistory> = null;// 新

/**
 * 创建路由
 * @param options 参数
 */
export function createRouter(options: Partial<RouterOptions>) {
  webHistory = createWebHistory(import.meta.env.VITE_PUBLIC_PATH);
  // app router
  let router = createVueRouter({
    history: webHistory,
    routes:[],
    //routes, // 使用从 routes.ts 导入的路由配置
    ...options,
  });

  setRouter(router)

  return router
}

// 销毁路由
export function destroyRouter() {
  setRouter(null as unknown as Router);
  if (webHistory) {
    webHistory.destroy();
  }
  webHistory = null
}

// 新
// export const routes: AppRouteRecordRaw[] = [
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: () => import('/@/views/gis/MapView.vue'),
//     meta: { title: '地图', icon: 'ion:map-outline' },
//   },
//   // 根路径重定向（修正版）
//   {
//     path: '/',
//     name: 'RootRedirect', // 添加 name（不可为空字符串）
//     redirect: '/dashboard',
//     meta: { title: '根路径重定向' }, // 至少保留空对象
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('/@/views/sys/login/Login.vue'),
//     meta: { title: '登录' },
//   },
// ];

// // 定义路由数组(新添加)
// export const routes: AppRouteRecordRaw[] = [
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: () => import('/@/views/gis/MapView.vue'), // 地图组件路径
//     meta: { title: '地图', icon: 'ion:map-outline' },
//   },
//   // 其他路由...
// ];

// export const routes: AppRouteRecordRaw[] = [
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: () => import('/@/views/gis/MapView.vue'),
//     meta: { title: '地图', icon: 'ion:map-outline' },
//   },
//   // 其他路由（如登录页、404等）需保留原有配置
//   // 示例：默认路由（请勿删除）
//   {
//     path: '/',
//     name: '',
//     redirect: '/dashboard', // 将根路径重定向到地图页
//     component: () => import('/@/views/gis/MapView.vue'),
//     meta: { title: '', icon: '' },
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('/@/views/sys/login/Login.vue'),
//     meta: { title: '登录' },
//   },
// ];

// export const routes: AppRouteRecordRaw[] = [
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: () => import('/@/views/gis/MapView.vue'),
//     meta: { title: '地图', icon: 'ion:map-outline' },
//   },
//   // 其他路由（如登录页、404等）需保留原有配置
//   // 示例：默认路由（请勿删除）
//   {
//     path: '/',
//     redirect: '/dashboard', // 将根路径重定向到地图页
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('/@/views/sys/login/Login.vue'),
//     meta: { title: '登录' },
//   },
// ];


