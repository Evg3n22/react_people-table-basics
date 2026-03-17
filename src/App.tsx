// import { Loader } from './components/Loader';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { People } from './components/People';
import cn from 'classnames';

export const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <a
              className={cn(
                'navbar-item',
                currentPath === '/' ? 'has-background-grey-lighter' : '',
              )}
              href="#/"
            >
              Home
            </a>

            <a
              className={cn(
                'navbar-item',
                currentPath.includes('/people')
                  ? 'has-background-grey-lighter'
                  : '',
              )}
              href="#/people"
            >
              People
            </a>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:slug" element={<People />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
