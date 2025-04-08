import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';

function Root() {
    return (
        <div className="container">
            <NavBar />
            <Outlet />
        </div>
    );
}

export default Root;
