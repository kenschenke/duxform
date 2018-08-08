import React from 'react';
import { Section } from './Section';
import { TextFields } from './TextFields';
import { NumberFields } from './NumberFields';
import { DateFields } from './DateFields';
import { SelectFields } from './SelectFields';
import { RadioButtons } from './RadioButtons';
import { Checkboxes } from './Checkboxes';
import { TextArea } from './TextArea';
import { Formatting } from './Formatting';
import { Parsing } from './Parsing';
import { Normalization } from './Normalization';
import { AutoComplete } from './AutoComplete';

export const App = () => (
    <div>
        <Section title="Text Fields" form={TextFields} name="textfields"/>
        <Section title="Number Fields" form={NumberFields} name="numberfields"/>
        <Section title="Date Fields" form={DateFields} name="datefields"/>
        <Section title="Select Fields" form={SelectFields} name="selectfields"/>
        <Section title="Radio Buttons" form={RadioButtons} name="radiobuttons"/>
        <Section title="Checkboxes" form={Checkboxes} name="checkboxes"/>
        <Section title="TextArea" form={TextArea} name="textarea"/>
        <Section title="Formatting" form={Formatting} name="formatting"/>
        <Section title="Parsing" form={Parsing} name="parsing"/>
        <Section title="Normalization" form={Normalization} name="normalization"/>
        <Section title="AutoComplete" form={AutoComplete} name="autocomplete"/>
    </div>
);
