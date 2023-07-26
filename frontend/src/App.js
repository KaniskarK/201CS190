import React, { useState, useEffect } from 'react';

function TrainTicketBooking() {
 const [trains, setTrains] = useState([]);
 const [selectedTrain, setSelectedTrain] = useState(null);
 const [ticketAvailability, setTicketAvailability] = useState({});

 useEffect(() => {
   fetch('/trains')
     .then(response => response.json())
     .then(data => setTrains(data));
 }, []);

 useEffect(() => {
   if (selectedTrain) {
     fetch('/trains/' + selectedTrain.id + '/availability')
       .then(response => response.json())
       .then(data => setTicketAvailability(data));
   }
 }, [selectedTrain]);

 return (
   <div>
     <h1>Train Ticket Booking</h1>
     <form>
       <select name="train" onChange={e => setSelectedTrain(e.target.value)}>
         {trains.map(train => (
           <option value={train.id}>{train.name}</option>
         ))}
       </select>
       <button type="submit">Search</button>
     </form>
     <div>
       {selectedTrain && (
         <table>
           <thead>
             <tr>
               <th>Train Number</th>
               <th>Departure Time</th>
               <th>Arrival Time</th>
               <th>Availability</th>
             </tr>
           </thead>
           <tbody>
             {ticketAvailability.map(availability => (
               <tr key={availability.id}>
                 <td>{availability.trainNumber}</td>
                 <td>{availability.departureTime}</td>
                 <td>{availability.arrivalTime}</td>
                 <td>{availability.availability}</td>
               </tr>
             ))}
           </tbody>
         </table>
       )}
     </div>
   </div>
 );
}

export default TrainTicketBooking;