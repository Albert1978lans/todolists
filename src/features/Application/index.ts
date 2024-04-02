import * as appSelectors from './selectors'
import {asyncActions} from "./application-reducer";
import {slice} from "./application-reducer";

const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...asyncActions,
    ...actions
}

export {
    appSelectors,
    appActions
}