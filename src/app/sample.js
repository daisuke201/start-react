import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import configureStore from '../store/configureStore';




import Root from '../containers/Root';
import { initAuth } from '../api/auth';
import { getAllStyles } from '../actions/tilestyles';
let injectTapEventPlugin = require('react-tap-event-plugin');

class UavCloud {
    constructor(common) {
        this._common = common;
        // Initialize store.
        this._store = configureStore();
        this._history = createHistory();
    }

    Start() {
        // first, firebase should be initalized.
        initAuth(this._store.dispatch).then(() => {
            injectTapEventPlugin();
            this._store.dispatch(getAllStyles());

            return new Promise((resolve, reject) => {
                let component = ReactDOM.render(
                    <Root store={this._store} history={this._history}/>,
                    document.getElementById('main')
                );
                if (component) {
                    resolve(true);
                } else {
                    reject(new Error('Failed rendering the contents'));
                }
            });
        });
    }
}

export default UavCloud;
