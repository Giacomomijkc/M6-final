const express =  require ('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 5050;

require('dotenv').config();

const app = express();

const authorsRoute = require('./routes/authors');
const postsRoute = require('./routes/posts');
const resourcesRoute = require('./routes/resources');
const commentsRoute = require('./routes/comments')

app.use(express.json())
app.use(cors());
app.use('/', authorsRoute)
app.use('/', postsRoute);
app.use('/', resourcesRoute);
app.use('/', commentsRoute);

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al server!'))
db.once('open', ()=> {
    console.log('Database MongoDB Connesso!');
});

app.listen(PORT, () => console.log(`Server avviato ed in ascolto sulla porta ${PORT}`))