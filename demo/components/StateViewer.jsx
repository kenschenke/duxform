import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

const mapStateViewerProps = state => {
    return {
        show: state.demo !== 'none',
        state: state.forms.hasOwnProperty(state.demo) ? JSON.stringify(state.forms[state.demo],null,3) : '{}',
    };
};

class StateViewerUi extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <SyntaxHighlighter language="javascript" style={agate}>
                {this.props.state}
            </SyntaxHighlighter>
        );
    }
}

StateViewerUi.propTypes = {
    show: PropTypes.bool.isRequired,
    state: PropTypes.string.isRequired
};

export const StateViewer = connect(mapStateViewerProps)(StateViewerUi);
