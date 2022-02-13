import express from 'express';
import dotenv from 'dotenv';
import { HttpError } from './utils/httpError';
import AllRouters from './routers';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended : false }));
app.use((error: HttpError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const code = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(code);
  res.send({
    code,
    message,
    info: error.info,
  });
});

app.use('/', AllRouters);

app.listen(port, () => {
  console.log(`server start on ${port}`);
});
