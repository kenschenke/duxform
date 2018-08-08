import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxAutoCompleteDropdownProps, mapDuxAutoCompleteDropdownDispatch } from './maps/DuxAutoCompleteDropdown.map';
import { connect } from 'react-redux';

class DuxAutoCompleteDropdownUi extends React.Component {
    onItemClicked = value => {
        this.props.itemClicked(this.props.formName, this.props.name, this.props.allowMulti, value);
    };

    render() {
        if (!this.props.items.length) {
            return null;
        }

        const divStyles = {
            left: this.props.left,
            width: this.props.width
        };

        const liItems = this.props.items.map(item => {
            if (this.props.highlightedValue < 0) {
                this.props.highlightedValue = item.value;
            }
            return (
                <li key={item.value} id={`duxacitem-${this.props.formName}-${this.props.name}-${item.value}`}
                    className={'duxformac-list-item ' + (this.props.highlightedValue===item.value ? 'highlighted' : 'normal')}
                    onClick={() => this.onItemClicked(item.value)}
                >
                    {item.label}
                </li>
            );
        });
        return (
            <div id={`duxac-${this.props.formName}-${this.props.name}`} className="duxformac-dropdown-container" style={divStyles}>
                <ul className="duxformac-dropdown-list">
                    {liItems}
                </ul>
            </div>
        );
    }
}

DuxAutoCompleteDropdownUi.propTypes = {
    items: PropTypes.array.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    highlightedValue: PropTypes.any,
    allowMulti: PropTypes.bool.isRequired,

    itemClicked: PropTypes.func.isRequired
};

export const DuxAutoCompleteDropdown = connect(mapDuxAutoCompleteDropdownProps, mapDuxAutoCompleteDropdownDispatch)(DuxAutoCompleteDropdownUi);
