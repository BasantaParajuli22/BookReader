import express from 'express';
import url from 'url';
import path from 'path';
import { errorHandler, logger, pageNotFound } from './middleware/middeware.js';
import routes from './routes/itemRoutes.js';
import cors from 'cors';


const __filepath = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);

const app = express();

app.use(cors());
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.use(logger);
app.use('/api',routes);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(5000, () =>{
    console.log(`server running in http://localhost:5000` );
})
