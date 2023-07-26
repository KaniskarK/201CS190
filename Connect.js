const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/trains', { useNewUrlParser: true, useUnifiedTopology: true });

const Train = mongoose.model('Train', {
 name: String,
 schedule: [{
   departureTime: String,
   arrivalTime: String,
   availability: String,
 }],
});

app.get('/trains', (req, res) => {
 Train.find()
   .then(data => res.json(data))
   .catch(err => res.status(500).json({ message: 'Error retrieving trains', error: err }));
});

app.post('/trains', (req, res) => {
 const { name, schedule } = req.body;
 const newTrain = new Train({ name, schedule });
 newTrain.save()
   .then(data => res.json(data))
   .catch(err => res.status(500).json({ message: 'Error creating train', error: err }));
});

app.put('/trains/:id', (req, res) => {
 const id = req.params.id;
 const { name, schedule } = req.body;
 Train.findByIdAndUpdate(id, { $set: { name, schedule } }, { new: true })
   .then(data => res.json(data))
   .catch(err => res.status(500).json({ message: 'Error updating train', error: err }));
});

app.delete('/trains/:id', (req, res) => {
 const id = req.params.id;
 Train.findByIdAndRemove(id)
   .then(data => res.json({ message: 'Train deleted successfully' }))
   .catch(err => res.status(500).json({ message: 'Error deleting train', error: err }));
});

app.listen(3000, () => console.log('Server started on port 3000'));