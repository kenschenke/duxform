import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '../pages/Root.jsx';
import Topic from "./Topic.jsx";

import IntroHtml from '../html/Intro.html?raw';

import GettingStarted from '../pages/GettingStarted.jsx';
import GettingStartedHtml from '../html/GettingStarted.html?raw';
import GettingStartedSource from '../source/GettingStarted.txt?raw';

import DataTypesHtml from '../html/DataTypes.html?raw';

import InputTypesHtml from '../html/InputTypes.html?raw';

import ReduxStateHtml from '../html/ReduxState.html?raw';

import HelpersHtml from '../html/Helpers.html?raw';

import Validation from '../pages/Validation.jsx';
import ValidationHtml from '../html/Validation.html?raw';
import ValidationSource from '../source/Validation.txt?raw';

import IdleValidation from '../pages/IdleValidation.jsx';
import IdleValidationHtml from '../html/IdleValidation.html?raw';
import IdleValidationSource from '../source/IdleValidation.txt?raw';

import AsyncValidation from '../pages/AsyncValidation.jsx';
import AsyncValidationHtml from '../html/AsyncValidation.html?raw';
import AsyncValidationSource from '../source/AsyncValidation.txt?raw';

import Formatting from '../pages/Formatting.jsx';
import FormattingHtml from '../html/Formatting.html?raw';
import FormattingSource from '../source/Formatting.txt?raw';

import AutoComplete from '../pages/AutoComplete.jsx';
import AutoCompleteHtml from '../html/AutoComplete.html?raw';
import AutoCompleteSource from '../source/AutoComplete.txt?raw';

import PropertiesReferenceHtml from '../html/PropertiesReference.html?raw';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Topic topic="intro" html={IntroHtml} />,
            },
            {
                path: "/gettingstarted",
                element: <Topic
                    topic="gettingstarted"
                    html={GettingStartedHtml}
                    component={GettingStarted}
                    source={GettingStartedSource}
                />,
            },
            {
                path: "/datatypes",
                element: <Topic topic="datatypes" html={DataTypesHtml} />
            },
            {
                path: "/inputtypes",
                element: <Topic topic="inputtypes" html={InputTypesHtml} />
            },
            {
                path: "/reduxstate",
                element: <Topic topic="reduxstate" html={ReduxStateHtml} />
            },
            {
                path: "/helpers",
                element: <Topic topic="helpers" html={HelpersHtml} />
            },
            {
                path: "/validation",
                element: <Topic
                    topic="validation"
                    html={ValidationHtml}
                    component={Validation}
                    source={ValidationSource}
                />,
            },
            {
                path: "/idlevalidation",
                element: <Topic
                    topic="idlevalidation"
                    html={IdleValidationHtml}
                    component={IdleValidation}
                    source={IdleValidationSource}
                />,
            },
            {
                path: "/asyncvalidation",
                element: <Topic
                    topic="asyncvalidation"
                    html={AsyncValidationHtml}
                    component={AsyncValidation}
                    source={AsyncValidationSource}
                />,
            },
            {
                path: "/formatting",
                element: <Topic
                    topic="formatting"
                    html={FormattingHtml}
                    component={Formatting}
                    source={FormattingSource}
                />,
            },
            {
                path: "/autocomplete",
                element: <Topic
                    topic="autocomplete"
                    html={AutoCompleteHtml}
                    component={AutoComplete}
                    source={AutoCompleteSource}
                />,
            },
            {
                path: "/propertiesreference",
                element: <Topic topic="propertiesreference" html={PropertiesReferenceHtml} />
            },
        ],
    }
]);

function App() {
    return (
        <div className="container">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
