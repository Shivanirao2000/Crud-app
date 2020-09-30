const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Step 1

const routes = require('./routes/api');

// Step 2
mongoose.connect("mongodb+srv://shivani:crud_app@cluster0.r6doi.mongodb.net/Crud-app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3
app.use(express.static(path.join(__dirname, './crud_app/build')))

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('crud_app/build'));

    // app.get('*', (req, res)=> {
    //     res.sendFile(path.resolve(__dirname, 'crud_app', 'build', 'index.html'));
    // });

    // app.get('*', function (req, res) {
    //     const index = path.join(__dirname, './crud_app', 'build', 'index.html');
    //     res.sendFile(index);
    //   });
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './crud_app/build/index.html'))
    })
    
}


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));