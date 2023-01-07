import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./categoryAction";
import { CATEGORIES_ACTION_TYPES } from "./categoryTypes";

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* fetchCategoriesAsync() {
    try {
        const categories = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categories)); 
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}