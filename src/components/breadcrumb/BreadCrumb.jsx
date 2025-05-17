import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ customPaths = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Merge custom paths (if provided) with route-based paths
  const breadcrumbs = customPaths.length > 0 
    ? customPaths 
    : pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return {
          name: path.replace(/-/g, ' '), // Format URL slugs (e.g., "my-page" → "my page")
          path: isLast ? null : routeTo, // Last item is not a link
        };
      });

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            {crumb.path ? (
              <Link
                to={crumb.path}
                className="text-blue-600 hover:underline capitalize"
              >
                {crumb.name}
              </Link>
            ) : (
              <span className="text-gray-600 capitalize" aria-current="page">
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;