import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Trash2 } from 'lucide-react';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(storedAppointments);
  }, []);

  const handleDelete = (index) => {
    const newAppointments = appointments.filter((_, i) => i !== index);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
    setAppointments(newAppointments);
    setShowDeleteConfirm(null);
  };

  if (appointments.length === 0) {
    return (
      <div className="mt-16 lg:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
          <div className="py-12">
            <div className="text-gray-500 mb-4">No scheduled appointments</div>
            <a 
              href="/directory" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book an appointment
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 lg:mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Appointments</h1>
          <a 
            href="/directory"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-5 h-5 mr-2" />
            New Appointment
          </a>
        </div>

        <div className="grid gap-6">
          {appointments.map((appointment, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-6 relative hover:shadow-md transition-shadow"
            >
              {showDeleteConfirm === index ? (
                <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-800 mb-4">Are you sure you want to cancel this appointment?</p>
                    <div className="space-x-4">
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium">{appointment.doctorName}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{appointment.time} hrs</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {appointment.specialty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointmentsPage;