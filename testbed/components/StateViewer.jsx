import { useSelector } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';

function StateViewer({ form }) {
    const formsState = useSelector(state => state.forms);
    const formState = formsState.hasOwnProperty(form) ?
        JSON.stringify(formsState[form], null, 2) : '{}';

    return (
        <SyntaxHighlighter language="javascript">
            {formState}
        </SyntaxHighlighter>
    );
}

export default StateViewer;
