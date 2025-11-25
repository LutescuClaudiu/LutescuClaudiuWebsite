import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mainRoutes from './routes/main.js';
import expressLayouts from 'express-ejs-layouts';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
