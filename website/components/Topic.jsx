import { createElement } from 'react'
import { useSelector } from 'react-redux';
import SyntaxHighlighter from "react-syntax-highlighter";

function Topic({ topic, html, component, source }) {
    const state = useSelector((state) => {
        const shadowState = { forms: {} };
        shadowState.forms[topic] = state.forms[topic] && state.forms[topic];
        return JSON.stringify(shadowState, null, 3);
    });

    return (
        <div className="container">
            { html &&
                <div dangerouslySetInnerHTML={{__html: html}}/>
            }
            { component &&
                <div className="row">
                    <div className="col">
                        {createElement(component)}
                    </div>
                    <div className="col">
                        <h5>Redux State</h5>
                        <SyntaxHighlighter language="javascript">
                            {state}
                        </SyntaxHighlighter>
                    </div>
                </div>
            }
            { source &&
                <div className="row">
                    <div className="col">
                        <h3>Source Code</h3>
                        <SyntaxHighlighter language="javascript">
                            {source}
                        </SyntaxHighlighter>
                    </div>
                </div>
            }
            <div id="footer" className="row mt-3">
                <div className="col">
                    <small>Copyright 2018-2025 by Ken Schenke</small>
                </div>
            </div>
        </div>
    );
}

export default Topic;
