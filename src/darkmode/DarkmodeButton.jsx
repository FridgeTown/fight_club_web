import React, { useEffect, useState } from 'react'
import styles from './DarkmodeButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function DarkmodeButton() {

  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // 컴포넌트가 마운트될 때 현재 테마를 적용
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button className={styles.darkmode_btn} onClick={toggleTheme}>
      {theme === "dark" ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
    </button>
  )
}
