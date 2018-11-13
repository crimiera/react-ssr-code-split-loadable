
import React from 'react';
import Loadable from 'react-loadable';
import AsyncLoading from './HOCS/AsyncLoading.js';
import Grid from './Grid'
import { fetchPopularRepos } from './api'

const Loader = () => {
  return <div >Loading ...</div>
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
    component:Loadable({
      loader: () => import('./Pages/Try'),
      loading: Loader,
    })

  },
  {
    path: '/page',
    component: Loadable({
      loader: () => import('./Pages/Page'),
      loading: Loader,
    })
  },
  {
    path: '/contact',
    component: Loadable({
      loader: () => import('./Pages/Contact'),
      loading: Loader,
    })
  },
]

export default routes