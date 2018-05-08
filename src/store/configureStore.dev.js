import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import RavenMiddleware from 'redux-raven-middleware';


// import { httpError } from '../middleware/httpError';
import rootReducer from '../reducers';

const ENABLE_LOG = true;

export default function configureStore(preloadedState) {
    let logger = createLogger();

    if (!ENABLE_LOG) {
        logger = createLogger({
            predicate: () => false
        });
    }
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(RavenMiddleware('https://6ceaed969fc84abe840ac88251a2369c@sentry.io/127055'), exceptionToError, thunk, exception, api, airmap, largeUpload, error, deleteAPI, checkpointParse, checkpointPost, gcpParse, gcpPost, tile, extTile, mockplans, progress, mapAnnotations, mockFlight, logger)
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
