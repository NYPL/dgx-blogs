import express from 'express';
import axios from 'axios';
// import parser from 'jsonapi-parserinator';

// import Model from '../../app/utils/HeaderItemModel.js';
import appConfig from '../../../appConfig.js';

const { refineryApi } = appConfig;
const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = refineryApi.root[appEnvironment];
  // options = {
  //   endpoint: `${apiRoot}${refineryApi.endpoint}`,
  //   includes: refineryApi.includes,
  //   filters: refineryApi.filters
  // };

// const completeApiUrl = parser.getCompleteApi(options);

router
  .route('/*')
  .get((req, res, next) => {
    res.locals.data = {
      Store: {
        _angularApps: ['Locations', 'Divisions', 'Profiles'],
        _reactApps: ['Staff Picks', 'Header', 'Book Lists'],
      },
      completeApiUrl: '',
    };

    // The next is needed so that Express knows to go to the
    // next middleware in the line.
    // This would be the app.get('/', ...) call in server.js.
    next();

    /* This is commented out but we need to make an HTTP call to the
     * Refinery, parse and model the returned data, and add it
     * to the Alt store in the proper variables.
     */
    // axios
    //   .get(completeApiUrl)
    //   .then(data => {
    //     // let parsed = parser.parse(data.data, options),
    //     //   modelData = Model.build(parsed);

    //     res.locals.data = {
    //       Store: {
    //         _storeVar: []
    //       },
    //       // Set the API URL here so we can access it when we
    //       // render in the EJS file.
    //       // completeApiUrl
    //     };
    //     next();
    //   })
    //   .catch(error => {
    //     console.log('error calling API : ' + error);
    //     console.log('Attempted to call : ' + completeApiUrl);

    //     res.locals.data = {
    //       Store: {
    //         _storeVar: []
    //       },
    //       // completeApiUrl
    //     };
    //     next();
    //   }); /* end Axios call */
  });

export default router;
