import React from 'react';
import {DuxForm} from '../../../src/DuxForm';
import {DuxInput} from '../../../src/DuxInput';

export const TextFields = () => (
    <DuxForm name="textfields" initialFocus="mixedcase">
        <div className="form-group">
            <label>Mixed Case</label>
            <DuxInput name="mixedcase" nextField="uppercase" className="form-control"/>
        </div>
        <div className="form-group">
            <label>Upper Case</label>
            <DuxInput name="uppercase" nextField="defaultvalue" forceUpper={true} className="form-control"/>
        </div>
        <div className="form-group">
            <label>Default Value</label>
            <DuxInput name="defaultvalue" nextField="mixedcase" className="form-control" defaultValue="Default Value"/>
        </div>
    </DuxForm>
);
