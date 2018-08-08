import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

const mapProps = (state, props) => {
    return {
        state: state.forms.hasOwnProperty(props.form) ?
            JSON.stringify(state.forms[props.form], null, 3) : '{}'
    };
};

class StateViewerUi extends React.Component {
    render() {
        return (
            <SyntaxHighlighter language="javascript" style={agate}>
                {this.props.state}
            </SyntaxHighlighter>
        );
    }
}

StateViewerUi.propTypes = {
    state: PropTypes.string.isRequired
};

export const StateViewer = connect(mapProps)(StateViewerUi);
