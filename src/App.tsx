import React from 'react';
import './App.css';
import HomePage from './views/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import logoEn from './assets/logo-en.svg';
import logoFr from './assets/logo-fr.svg';
import ApplicationsPage from './views/ApplicationsPage/ApplicationsPage';
import Notification from './components/Notification/Notification';
import { useTranslation } from 'react-i18next';
import LangButton from './components/LangButton/LangButton';


const App = () => {
  const { t, i18n } = useTranslation();

  return (
    <Router>
      <Notification />
      <LangButton/>
      <div className="header">
        <h1 className="title">{t('welcome1')} <br/> {t('welcome2')} <br/> {t('welcome3')}</h1>
        <img src={i18n.language === 'en-CA' ? logoEn : logoFr } className="logo" alt="" />
      </div>
      <ul className="nav">
          <li className='nav-link'>
            <NavLink 
              to="/"   
              className={({isActive}) => (isActive ? " selected" : "")}
            >
              Products
            </NavLink>
          </li>
          <li className='nav-link'>
            <NavLink 
              to="applications"   
              className={({isActive}) => (isActive ? " selected" : "")}
            >
              Applications
            </NavLink>
          </li>
        </ul>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
