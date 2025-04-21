import React, { useState } from 'react';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

function AppointmentModal({ isOpen, onClose, doctor }) {
  const [selectedTime, setSelectedTime] = useState('');

  const handleConfirm = () => {
    if (!selectedTime) return;

    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const appointment = {
      doctorName: doctor.name,
      specialty: doctor.specialty,
      location: doctor.location,
      date: currentDate,
      time: selectedTime
    };

    // Get existing appointments or initialize empty array
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Add new appointment
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));
    
    onClose();
    setSelectedTime('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-900">{doctor.name}</h3>
          <p className="text-gray-500">{doctor.specialty}</p>
          <p className="text-gray-500 text-sm mt-1">{doctor.location}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Available Hours:</h4>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedTime}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${
              selectedTime
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentModal;