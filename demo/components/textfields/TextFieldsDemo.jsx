import React from 'react';
import { connect } from 'react-redux';
import { DemoContainer } from '../DemoContainer';
import { TextFields } from './TextFields';
import Source from './TextFieldsCode.txt';
import Description from './TextFieldsDescription.html';

const mapTextFieldsDemoProps = state => {
    return {
        state: state.forms.hasOwnProperty('textfields') ? JSON.stringify(state.forms.textfields,null,3) : '{}'
    };
};

class TextFieldsDemoUi extends React.Component {
    render() {
        return (
            <DemoContainer
                title="Text Fields"
                description={Description}
                demoComponent={TextFields}
                state={this.props.state}
                source={Source}
            />
        )
    }
}

export const TextFieldsDemo = connect(mapTextFieldsDemoProps)(TextFieldsDemoUi);
