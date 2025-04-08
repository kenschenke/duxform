import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';

function GettingStarted() {
    return (
        <DuxForm name="gettingstarted" onSubmit={values => alert(`Name = ${values.fullname}, Age = ${values.age}`)}>
            <div className="form-group">
                <label>Name</label>
                <DuxInput name="fullname" className="form-control" nextField="age" />
            </div>
            <div className="form-group">
                <label>Age</label>
                <DuxInput name="age" dataType="num" className="form-control" nextField="fullname" />
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
        </DuxForm>
    );
}

export default GettingStarted;
