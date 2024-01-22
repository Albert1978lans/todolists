
import React from "react";
import AppWithRedux from "./AppWithRedux";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}



export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux demo={true}/>
}