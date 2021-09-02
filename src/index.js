import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SimpleReactLightbox from 'simple-react-lightbox'

ReactDOM.render(
    <React.Fragment>
        <SimpleReactLightbox>
            <App/>
        </SimpleReactLightbox>
    </React.Fragment>,
    document.getElementById('root')
);

