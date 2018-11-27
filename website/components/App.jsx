import React from 'react';
import { NavBar } from './NavBar';
import { Topic } from './Topic';

import IntroHtml from '../html/Intro.html';

import { GettingStarted } from './GettingStarted';
import GettingStartedHtml from '../html/GettingStarted.html';
import GettingStartedSource from '../source/GettingStarted.txt';

import DataTypesHtml from '../html/DataTypes.html';

import InputTypesHtml from '../html/InputTypes.html';

import ReduxStateHtml from '../html/ReduxState.html';

import HelpersHtml from '../html/Helpers.html';

import { Validation } from './Validation';
import ValidationHtml from '../html/Validation.html';
import ValidationSource from '../source/Validation.txt';

import { IdleValidation } from './IdleValidation';
import IdleValidationHtml from '../html/IdleValidation.html';
import IdleValidationSource from '../source/IdleValidation.txt';

import { AsyncValidation } from './AsyncValidation';
import AsyncValidationHtml from '../html/AsyncValidation.html';
import AsyncValidationSource from '../source/AsyncValidation.txt';

import { Formatting } from './Formatting';
import FormattingHtml from '../html/Formatting.html';
import FormattingSource from '../source/Formatting.txt';

import { AutoComplete } from './AutoComplete';
import AutoCompleteHtml from '../html/AutoComplete.html';
import AutoCompleteSource from '../source/AutoComplete.txt';

import PropertiesReferenceHtml from '../html/PropertiesReference.html';

const topics = [
    {
        topic: 'intro',
        html: IntroHtml
    },
    {
        topic: 'gettingstarted',
        component: GettingStarted,
        html: GettingStartedHtml,
        source: GettingStartedSource
    },
    {
        topic: 'datatypes',
        html: DataTypesHtml
    },
    {
        topic: 'inputtypes',
        html: InputTypesHtml
    },
    {
        topic: 'reduxstate',
        html: ReduxStateHtml
    },
    {
        topic: 'helpers',
        html: HelpersHtml
    },
    {
        topic: 'validation',
        component: Validation,
        html: ValidationHtml,
        source: ValidationSource
    },
    {
        topic: 'idlevalidation',
        component: IdleValidation,
        html: IdleValidationHtml,
        source: IdleValidationSource
    },
    {
        topic: 'asyncvalidation',
        component: AsyncValidation,
        html: AsyncValidationHtml,
        source: AsyncValidationSource
    },
    {
        topic: 'formatting',
        component: Formatting,
        html: FormattingHtml,
        source: FormattingSource
    },
    {
        topic: 'autocomplete',
        component: AutoComplete,
        html: AutoCompleteHtml,
        source: AutoCompleteSource
    },
    {
        topic: 'propertiesreference',
        html: PropertiesReferenceHtml
    }
];

export const App = () => {
    const topicComponents = topics.map(topic => {
        return (
            <Topic
                key={topic.topic}
                topic={topic.topic}
                component={topic.component}
                source={topic.source}
                html={topic.html}
            />
        );
    });

    return (
        <div className="container">
            <NavBar/>
            {topicComponents}
        </div>
    );
};
