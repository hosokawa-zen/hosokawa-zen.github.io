import React, { useState } from 'react';
import { List, X } from 'react-bootstrap-icons';

const Layout = (props) => {

    const [mActive, setMactive] = useState(false);

    return (
        <div className={mActive ? 'mobile-nav-active' : ''}>
            <div className="mobile-nav-toggle d-xl-none" onClick={() => { setMactive(!mActive) }}>
                {mActive ? <X /> : <List />}
            </div>
            <main>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
