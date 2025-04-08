import Section from './Section.jsx';
import TextFields from './TextFields.jsx';
import NumberFields from './NumberFields.jsx';
import DateFields from './DateFields.jsx';
import SelectFields from './SelectFields.jsx';
import RadioButtons from './RadioButtons.jsx';
import Checkboxes from './Checkboxes.jsx';
import TextArea from './TextArea.jsx';
import Formatting from './Formatting.jsx';
import Parsing from './Parsing.jsx';
import Normalization from './Normalization.jsx';
import AutoComplete from './AutoComplete.jsx';

function App() {
    return (
        <div>
            <Section title="Text Fields" form={TextFields} name="textfields" />
            <Section title="Number Fields" form={NumberFields} name="numberfields" />
            <Section title="Date Fields" form={DateFields} name="datefields" />
            <Section title="Select Fields" form={SelectFields} name="selectfields" />
            <Section title="Radio Buttons" form={RadioButtons} name="radiobuttons" />
            <Section title="Checkboxes" form={Checkboxes} name="checkboxes" />
            <Section title="TextArea" form={TextArea} name="textarea" />
            <Section title="Formatting" form={Formatting} name="formatting" />
            <Section title="Parsing" form={Parsing} name="parsing" />
            <Section title="Normalization" form={Normalization} name="normalization" />
            <Section title="AutoComplete" form={AutoComplete} name="autocomplete" />
        </div>
    );
}

export default App;
