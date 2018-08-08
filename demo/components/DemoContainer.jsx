import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

export class DemoContainer extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>{this.props.title}</h3>

                        <div dangerouslySetInnerHTML={{__html: this.props.description}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {React.createElement(this.props.demoComponent)}
                    </div>
                    <div className="col">
                        <SyntaxHighlighter language="javascript" style={agate}>
                            {this.props.state}
                        </SyntaxHighlighter>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3>Source Code</h3>
                        <SyntaxHighlighter language="javascript" style={agate}>
                            {this.props.source}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        );
    }
}

DemoContainer.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    demoComponent: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
};
