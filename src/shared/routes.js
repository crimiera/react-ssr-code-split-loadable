
import React from 'react';
import AsyncLoading from './HOCS/AsyncLoading.js';
import Grid from './Grid'

import { fetchPopularRepos } from './api'


const Loader = () => {
  return (<div >Loading ...</div>)
}

const routes =  [
  {
    path: '/',
    exact: true,
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  },
  {
    path: '/popular/:id',
    exact:true,
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  },
  {
    path: '/try',
    component: AsyncLoading(() => import("./Pages/Try"))
  },
  {
    path: '/page',
    component: AsyncLoading(() => import("./Pages/Page"))
  },
  {
    path: '/contact',
    component: AsyncLoading(() => import("./Pages/Contact"))
  },



]

export default routes