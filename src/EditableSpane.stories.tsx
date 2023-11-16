
import {action} from '@storybook/addon-actions'
import React from "react";
import EditableSpane from "./EditableSpane";

export default {
    title: 'EditableSpan Component',
    component: EditableSpane
}


const changeCallback = action('Value changed')

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpane title={'Start value'} changeTitle={changeCallback}/>
}