// sample saga
// reference from https://github.com/redux-saga/redux-saga/blob/master/examples/counter/src/sagas/index.js
import { put, takeEvery, delay } from 'redux-saga/effects'

export function* incrementAsync() {
    yield delay(1000);
    yield put({ type: 'INCREMENT' });
}

export default function* rootSaga(): Generator<any, any, any> {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}
