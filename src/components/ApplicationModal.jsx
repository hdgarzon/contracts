import React from 'react';

export const ApplicationModal = ({ onSubmit, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <div className="bg-blue-800 rounded-lg p-3">
            <span className="text-white font-bold">ELITE</span>
            <div className="bg-yellow-400 h-1 mt-1"></div>
          </div>
        </div>
      </div>
      
      <h2 className="text-lg font-semibold text-center mb-4">Thank you for your interest in this role.</h2>
      <p className="text-center text-gray-600 mb-6">Please answer the following questions:</p>
      
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        
        // Obtener datos del formulario
        const formData = new FormData(e.target);
        
        // Obtener días disponibles de los checkboxes
        const availableDays = Array.from(
          document.querySelectorAll('input[name="availableDays"]:checked')
        ).map(cb => cb.value);
        
        // Formatear los datos
        const formValues = {
          teamSize: formData.get('teamSize'),
          experienceYears: formData.get('experienceYears'),
          hasPropertyExperience: formData.get('experience') === 'yes',
          companyName: formData.get('companyName'),
          lastCleanedYear: formData.get('lastCleanedYear'),
          availableDays: availableDays,
          unavailableTimes: formData.get('unavailableTimes')
        };
        
        // Registrar los valores del formulario para depuración
        console.log("Valores del formulario a enviar:", formValues);
        
        // Enviar el formulario
        onSubmit(formValues);
      }}>
        <div className="mb-4">
          <label className="block mb-2">1. How many cleaners are on your team</label>
          <select name="teamSize" className="w-full p-2 border rounded" required>
            <option value="2-5">2-5 cleaners</option>
            <option value="6-10">6-10 cleaners</option>
            <option value="11-20">11-20 cleaners</option>
            <option value="20+">20+ cleaners</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">2. How many years have you been cleaning?</label>
          <select name="experienceYears" className="w-full p-2 border rounded" required>
            <option value="<1">Less than 1 year</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">3. Do you have current experience cleaning for property management companies?</label>
          <div className="flex items-center">
            <input type="radio" name="experience" id="exp-yes" value="yes" className="mr-2" defaultChecked />
            <label htmlFor="exp-yes" className="mr-4">Yes</label>
            
            <input type="radio" name="experience" id="exp-no" value="no" className="mr-2" />
            <label htmlFor="exp-no">No</label>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">What was the name of the company?</label>
          <input type="text" name="companyName" className="w-full p-2 border rounded" />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">What year was the last time you cleaned for that company?</label>
          <input type="text" name="lastCleanedYear" className="w-full p-2 border rounded" />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">4. Please Mark the days you ARE AVAILABLE to work?</label>
          <div className="flex flex-wrap">
            {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="mr-4 mb-2 flex items-center">
                <input 
                  type="checkbox" 
                  id={`day-${day}`}
                  name="availableDays"
                  value={day}
                  className="mr-1" 
                  defaultChecked={['Mon', 'Wed', 'Thur', 'Fri', 'Sun'].includes(day)} 
                />
                <label htmlFor={`day-${day}`}>{day}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">5. Are there any times of the day that you CAN NOT work?</label>
          <select name="unavailableTimes" className="w-full p-2 border rounded" required>
            <option value="mornings">Yes, mornings (6 AM - 12 PM)</option>
            <option value="afternoons">Yes, afternoons (12 PM - 6 PM)</option>
            <option value="evenings">Yes, evenings (6 PM - 12 AM)</option>
            <option value="none">No, I'm available any time</option>
          </select>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
);