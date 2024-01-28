import mongoose from 'mongoose';

(async () =>{
    try{
        const db = await mongoose.connect('mongodb://localhost/binca');
        console.log(`App is connected to Database: ${db.connection.name}`);
    } catch (err) {
        console.log(`There is an error to connect the Database err: ${err}`)
    }
})();