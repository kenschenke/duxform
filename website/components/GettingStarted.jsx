import React from 'react';
import { DuxForm } from '../../src/DuxForm';
import { DuxInput } from '../../src/DuxInput';

export class GettingStarted extends React.Component {
    render() {
        return (
            <DuxForm name="gettingstarted" onSubmit={values => alert(`Name = ${values.fullname}, Age = ${values.age}`)}>
                <div className="form-group">
                    <label>Name</label>
                    <DuxInput name="fullname" className="form-control" nextField="age"/>
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <DuxInput name="age" dataType="num" className="form-control" nextField="fullname"/>
                </div>
                <button type="submit" className="btn btn-secondary">Submit</button>
            </DuxForm>
        );
    }
}
