import React from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="main-header">
      <NavLink to="/" className="header-logo">
        도전 할래?
      </NavLink>
    </div>
  );
}
