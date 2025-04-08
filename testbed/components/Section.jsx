import React from "react";
import { useState } from 'react';
import StateViewer from './StateViewer.jsx';
import { BsChevronRight, BsChevronDown } from "react-icons/bs";

function Section({ title, form, name }) {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col">
                    <div className="alert alert-secondary" onClick={toggleCollapsed} style={{ cursor: 'pointer' }}>
                        <h4>
                            {collapsed &&
                                <BsChevronRight />
                            }
                            {!collapsed &&
                                <BsChevronDown />
                            }
                            <span style={{ marginLeft: 4}}>{title}</span>
                        </h4>
                    </div>
                </div>
            </div>
            {!collapsed &&
                <div className="row">
                    <div className="col">
                        {React.createElement(form)}
                    </div>
                    <div className="col">
                        <StateViewer form={name} />
                    </div>
                </div>
            }
        </div>
    );
}

export default Section;
