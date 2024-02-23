
import React from "react";
import AppWithRedux from "./app/AppWithRedux";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}



export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux demo={true}/>
}