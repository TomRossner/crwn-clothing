import { compose, createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
// import { loggerMiddleware } from "./middleware/middleware"; // Self built logger
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['cart']
}
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean); // If false renders empty array, else renders 'logger'.
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);