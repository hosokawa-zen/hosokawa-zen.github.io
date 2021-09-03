import React from "react";
import { useLightbox } from "simple-react-lightbox";
import { ChevronExpand } from 'react-bootstrap-icons'

const Button = (props) => {
    const { openLightbox } = useLightbox();

    return (
        <button
            className="SRL_CTA-OpenLightbox"
            onClick={(event) => {
                event.stopPropagation();
                openLightbox(props.imageToOpen)
            }}
        >
            <ChevronExpand />
        </button>
    );
};

export default Button;
