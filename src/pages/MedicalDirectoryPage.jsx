import React, { useState, useMemo } from 'react';
import AppointmentModal from '../components/AppointmentModal';

const doctors = [
  {
    "id": 1,
    "name": "Dr. Sarah Johnson",
    "photo": "https://randomuser.me/api/portraits/women/1.jpg",
    "specialty": "Cardiology",
    "availability": "Monday - Friday, 9:00 AM - 5:00 PM",
    "location": "North Medical Center, Office 304"
  },
  {
    "id": 2,
    "name": "Dr. Michael Chen",
    "photo": "https://randomuser.me/api/portraits/men/2.jpg",
    "specialty": "Pediatrics",
    "availability": "Tuesday - Saturday, 8:00 AM - 4:00 PM",
    "location": "East Pediatric Clinic, Floor 2"
  },
  {
    "id": 3,
    "name": "Dr. Ana García",
    "photo": "https://randomuser.me/api/portraits/women/3.jpg",
    "specialty": "Dermatology",
    "availability": "Monday - Thursday, 10:00 AM - 6:00 PM",
    "location": "South Dermatological Center, Office 105"
  },
  {
    "id": 4,
    "name": "Dr. James Wilson",
    "photo": "https://randomuser.me/api/portraits/men/4.jpg",
    "specialty": "Neurology",
    "availability": "Wednesday - Sunday, 9:00 AM - 5:00 PM",
    "location": "Central Neurological Institute, Floor 5"
  },
  {
    "id": 5,
    "name": "Dr. María Rodríguez",
    "photo": "https://randomuser.me/api/portraits/women/5.jpg",
    "specialty": "Ophthalmology",
    "availability": "Monday - Friday, 8:00 AM - 4:00 PM",
    "location": "West Ophthalmological Center, Office 203"
  },
  {
    "id": 6,
    "name": "Dr. David Kim",
    "photo": "https://randomuser.me/api/portraits/men/6.jpg",
    "specialty": "Traumatology",
    "availability": "Tuesday - Saturday, 10:00 AM - 6:00 PM",
    "location": "Central Hospital, Floor 3"
  }
];

const availabilityOptions = [
  "Every day",
  "Monday - Friday",
  "Tuesday - Saturday",
  "Wednesday - Sunday",
  "Monday - Thursday"
];

function MedicalDirectoryPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specialties = useMemo(() => {
    return [...new Set(doctors.map(doctor => doctor.specialty))].sort();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
      const matchesAvailability = !selectedAvailability || doctor.availability.includes(selectedAvailability);
      return matchesSpecialty && matchesAvailability;
    });
  }, [selectedSpecialty, selectedAvailability]);

  const handleReset = () => {
    setSelectedSpecialty('');
    setSelectedAvailability('');
  };

  const handleAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-16 lg:mt-0">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Medical Directory</h1>
        
        {/* Filters Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Search Filters</h2>
            {(selectedSpecialty || selectedAvailability) && (
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                Medical Specialty
              </label>
              <div className="relative">
                <select
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 pr-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none"
                >
                  <option value="">All specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div className="relative">
                <select
                  id="availability"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 pr-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none"
                >
                  <option value="">Any availability</option>
                  {availabilityOptions.map(availability => (
                    <option key={availability} value={availability}>
                      {availability}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <p className="text-gray-600">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor found' : 'Doctors found'}
          </p>
          <div className="text-sm text-gray-500">
            {selectedSpecialty && <span className="mr-2">Medical Specialty: {selectedSpecialty}</span>}
            {selectedAvailability && <span>Availability: {selectedAvailability}</span>}
          </div>
        </div>
        
        {/* Doctors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">{doctor.availability}</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">{doctor.location}</p>
                </div>

                <button
                  onClick={() => handleAppointment(doctor)}
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Book appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No doctors found with the selected filters.</p>
          </div>
        )}

        {/* Appointment Modal */}
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDoctor(null);
          }}
          doctor={selectedDoctor}
        />
      </div>
    </div>
  );
}

export default MedicalDirectoryPage;