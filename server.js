// const express = require('express');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const path = require('path');
// const bodyParser=require("body-parser");

// const app = express();
// const PORT = process.env.PORT || 8000; // Step 1

// const routes = require('./routes/api');

// // Step 2
// mongoose.Promise = global.Promise;
// 	mongoose.connect("mongodb+srv://shivani:crud_app@cluster0.r6doi.mongodb.net/Crud-app?retryWrites=true&w=majority" , {
					
// 			useUnifiedTopology: true,
// 			useNewUrlParser: true,
// 			useCreateIndex: true
// 		}).then(()=>{
// 			console.log("Connected to db");
// 		}).catch(err=>{
// 			console.log("error:", err.message);
// 		});
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static(__dirname+"/public"));
// // app.use(methodOverride("_method"));


// // Data parsing
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Step 3



// // HTTP request logger
// app.use(morgan('tiny'));
// app.use('/api', routes);




// app.listen(PORT, console.log(`Server is starting at ${PORT}`));

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