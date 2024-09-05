import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Menu.css';

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine the active button based on the current path
  const getActiveButton = (path) => {
    switch (path) {
      case '/ol-compass/home':
        return 'home';
      case '/ol-compass/learn':
        return 'learn';
      case '/ol-compass/get-inspired':
        return 'get-inspired';
      case '/ol-compass/contextualize':
        return 'contextualize';
      case '/ol-compass/analyze':
        return 'analyze';
      case '/ol-compass/ideate':
        return 'ideate';
      case '/ol-compass/compare':
        return 'compare';
      case '/ol-compass/evaluate':
        return 'evaluate';
      case '/ol-compass/make-yours':
        return 'make-yours';
      default:
        return null;
    }
  };

  const activeButton = getActiveButton(currentPath);

  return (
    <div className="bottom-menu">
      <Link
        to="/ol-compass/home"
        className={`menu-button ${activeButton === 'home' ? 'active' : ''}`}
      >
        HOME
      </Link>
      <Link
        to="/ol-compass/learn"
        className={`menu-button ${activeButton === 'learn' ? 'active' : ''}`}
      >
        LEARN
      </Link>
      <Link
        to="/ol-compass/get-inspired"
        className={`menu-button ${activeButton === 'get-inspired' ? 'active' : ''}`}
      >
        GET INSPIRED
      </Link>
      <Link
        to="/ol-compass/contextualize"
        className={`menu-button ${activeButton === 'contextualize' ? 'active' : ''}`}
      >
        CONTEXTUALIZE
      </Link>
      <Link
        to="/ol-compass/analyze"
        className={`menu-button ${activeButton === 'analyze' ? 'active' : ''}`}
      >
        ANALYZE
      </Link>
      <Link
        to="/ol-compass/ideate"
        className={`menu-button ${activeButton === 'ideate' ? 'active' : ''}`}
      >
        IDEATE
      </Link>
      <Link
        to="/ol-compass/compare"
        className={`menu-button ${activeButton === 'compare' ? 'active' : 'disabled'}`}
      >
        COMPARE
      </Link>
      <Link
        to="/ol-compass/evaluate"
        className={`menu-button ${activeButton === 'evaluate' ? 'active' : 'disabled'}`}
      >
        EVALUATE
      </Link>
      <Link
        to="/ol-compass/make-yours"
        className={`menu-button ${activeButton === 'make-yours' ? 'active' : 'disabled'}`}
      >
        MAKE YOURS
      </Link>
      {/* <Link
        to="/some-other-path"
        className={`menu-button ${activeButton === 'plus' ? 'active' : 'disabled'}`}
      >
        +
      </Link> */}
    </div>
  );
};

export default Menu;
