import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <Link className="navbar-brand" to="/">
                <img src="duxform.png" height={30} className="d-inline-block align-top mr-2"/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Welcome</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/gettingstarted">Getting Started</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup={true} aria-expanded={false}>Learn More</a>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/datatypes">Data Types</Link>
                            <Link className="dropdown-item" to="/inputtypes">Input Types</Link>
                            <Link className="dropdown-item" to="/reduxstate">Redux State</Link>
                            <Link className="dropdown-item" to="/helpers">Helper Functions</Link>
                            <Link className="dropdown-item" to="/validation">Validation</Link>
                            <Link className="dropdown-item" to="/idlevalidation">Delayed Validation</Link>
                            <Link className="dropdown-item" to="/asyncvalidation">Asynchronous Validation</Link>
                            <Link className="dropdown-item" to="/formatting">Formatting</Link>
                            <Link className="dropdown-item" to="/autocomplete">Autocomplete Lists</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/propertiesreference">Reference</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
