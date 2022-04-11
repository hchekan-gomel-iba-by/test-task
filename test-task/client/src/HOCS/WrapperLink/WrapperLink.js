import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './WrapperLink.module.scss';

export const WrapperLink = ({ condition, title, ...props }) =>
  condition && (
      <li className={styles.li}><NavLink {...props}>{title}</NavLink></li>
  );
