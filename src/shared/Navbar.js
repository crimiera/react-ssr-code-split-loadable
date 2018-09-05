import React from 'react'
import {Link, NavLink } from 'react-router-dom'

export default function Navbar () {
  const languages = [{
    name: 'All',
    param: 'all'
  }, {
    name: 'JavaScript',
    param: 'javascript',
  }, {
    name: 'Ruby',
    param: 'ruby',
  }, {
    name: 'Python',
    param: 'python',
  }, {
    name: 'Java',
    param: 'java',
  }]

  return (
    <ul>
      {languages.map(({ name, param }) => (
        <li key={param}>
          <NavLink activeStyle={{color:'red',fontWeight: 'bold'}} to={`/popular/${param}`}>
            {name} heloo
          </NavLink>
          
        </li>

      ))}
      <li><Link to='/try'>try</Link></li>
      <li><Link to='/contact'>contact</Link></li>
    
      <li><Link to='/page'>page</Link></li>
    </ul>
  )
}