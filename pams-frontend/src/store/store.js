import {
    configureStore,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { RootReducer } from '../reducer/rootReducer';
const middleware =[thunk]
export const Store = configureStore({ reducer: RootReducer, middleware: middleware })
export default Store;