if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}
import 'dotenv/config';
import 'reflect-metadata';
import { Action, createExpressServer, useContainer } from 'routing-controllers';
import path from 'path';
import { ErrorHandler } from './exceptions/filter';
import { ResponseInterceptor } from './interceptors/Response.interceptor';
import { LoggingMiddleware } from './middlewares/Logging.middleware';
import Container from 'typedi';

const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

useContainer(Container);
const app = createExpressServer({
  routePrefix: '',
  controllers: [path.join(__dirname + `/controllers/*.${ext}`)],
  middlewares: [LoggingMiddleware, ErrorHandler],
  interceptors: [ResponseInterceptor],
  cors: true,
  defaultErrorHandler: false,
  currentUserChecker: (action: Action) => {
    return action.request['user'];
  },
  defaults: {
    nullResultCode: 404,
    undefinedResultCode: 204,
    paramOptions: {
      required: true,
    },
  },
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`RUNNING PORT ${port}`);
});
