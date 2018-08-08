import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

const mapSourceViewerProps = state => {
    return {
        source: state.source
    }
};

class SourceViewerUi extends React.Component {
    render() {
        if (this.props.source === 'none') {
            return null;
        }

        return (
            <SyntaxHighlighter language="jsx" style={agate}>
                {this.props.source}
            </SyntaxHighlighter>
        );
    }
}

SourceViewerUi.propTypes = {
    source: PropTypes.string.isRequired
};

export const SourceViewer = connect(mapSourceViewerProps)(SourceViewerUi);
