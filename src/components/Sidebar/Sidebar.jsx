import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    
    { path: '/directory', label: 'Medical Directory' },
    { path: '/appointments', label: 'My Appointments' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">MediCare</h1>
              <p className="text-xs text-gray-400">Medical Appointment System</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => onClose()}
                  className={`block py-2 px-4 rounded transition-colors ${
                    location.pathname === item.path
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;