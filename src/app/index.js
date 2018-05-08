import _ from 'lodash';
import sample from './sample';
import Common from '../common';
import { initCloudError, logException, logMessage } from '../common/error';

function init(options) {
    initCloudError();

    // Initialize Common
    let common = new Common(options);

    if (_.isUndefined(common) || _.isNull(common)) {
        return new Error('failed to initialize of Common object');
    }
    return common.Init().then(() => {
        return Promise.resolve();
    }).then(() => {
        return new UavCloud(common);
    }).catch(err => {
        // TODO: register all log
        console.log('######### Root error :' + err + '###############');
        logException(err, 'window.onerror');
        return err;
    });
}

window.onerror = function(message, file, line, col, error) {
    console.log('An error occurred at line ' + line + ' of ' + file + ': ' + message);
    if (!_.isNull(error) && !_.isUndefined(error)) {
        logException(error, 'window.onerror');
    } else {
        logMessage('message:' + message + ' file:' + file + ' line:' + line, 'window.onerror');
    }
    return false;
};

export default init;
