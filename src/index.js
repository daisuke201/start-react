// import React from 'react';
import UavCloud from './app';
import { trace } from './utils/debug';

UavCloud().then(function success(app) {
    // window.React = React;
    return app.Start();
}).catch(function error(err) {
    // Catch application error
    trace(err);
    console.log('Init error:', err.message);
});

