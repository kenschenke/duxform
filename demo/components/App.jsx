import React from 'react';
import { DemoChooser } from './DemoChooser';
import { FormViewer } from './FormViewer';
import { StateViewer } from './StateViewer';
import { SourceViewer } from './SourceViewer';
import { TextFieldsDemo } from './textfields/TextFieldsDemo';

const BasicFormSrc = require('./source/BasicForm.txt');

/*
Basic form
	String Field
	Date Field
	Number Field
	Checkbox field
	Validation
		Validation on number field (cannot be negative)
		Validation on date (cannot be in the future)
		Validation on string (cannot be empty)
	Next Field

Number Fields
	Precision
	Commas
	Show Dollar

Force Upper Case

Select Tags

Radio Buttons

User Formatting
User Parsing
User Normalizing
	Phone Number

 */

export const App = () => {
    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-2">
                    <DemoChooser/>
                </div>
                <div className="col">
                    <TextFieldsDemo/>
                </div>
            </div>
        </div>
    );
};
