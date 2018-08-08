import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import demos from '../demos.json';
import C from '../constants';

const mapDemoChooserProps = state => {
    return {
        demo: state.demo
    };
};

const mapDemoChooserDispatch = dispatch => {
    return {
        demoClicked(demo, source) {
            dispatch({
                type: C.SET_DEMO,
                payload: demo
            });
            dispatch({
                type: C.SET_SOURCE,
                payload: source
            });
        }
    };
};

class DemoChooserUi extends React.Component {
    demoClicked = (event, demo, source) => {
        event.preventDefault();
        this.props.demoClicked(demo, source);
    };

    render() {
        const items = demos.demos.map(demo => {
            return (
                <a
                    key={demo.form}
                    href="#"
                    className={'list-group-item list-group-item-action flex-column align-items-start' + (this.props.demo===demo.form ? ' bg-secondary text-light' : '')}
                    onClick={e => this.demoClicked(e,demo.form,demo.source)}
                >
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{demo.title}</h5>
                    </div>
                    <p className="mb-1">{demo.description}</p>
                </a>
            );
        });
        return (
            <ul className="list-group">
                {items}
            </ul>
        );
    }
}

DemoChooserUi.propTypes = {
    demo: PropTypes.string.isRequired,
    demoClicked: PropTypes.func.isRequired
};

export const DemoChooser = connect(mapDemoChooserProps, mapDemoChooserDispatch)(DemoChooserUi);
