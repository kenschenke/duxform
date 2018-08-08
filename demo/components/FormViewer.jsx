import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BasicForm } from './BasicForm';

const mapFormViewerProps = state => {
    return {
        demo: state.demo
    };
};

class FormViewerUi extends React.Component {
    render() {
        return (
            <div>
                { this.props.demo === 'none' &&
                <h3 className="text-muted">Select a Demo</h3>
                }
                { this.props.demo === 'basic' &&
                <BasicForm/>
                }
            </div>
        );
    }
}

FormViewerUi.propTypes = {
    demo: PropTypes.string.isRequired
};

export const FormViewer = connect(mapFormViewerProps)(FormViewerUi);
