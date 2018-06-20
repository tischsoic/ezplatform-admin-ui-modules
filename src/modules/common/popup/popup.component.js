import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/popup.component.css';

export default class PopupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible,
        };

        this.hidePopup = this.hidePopup.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return  {
            ...prevState,
            visible: nextProps.visible,
        };
    }

    /**
     * Hides a popup
     *
     * @method hidePopup
     * @param {SyntheticEvent}
     * @memberof PopupComponent
     */
    hidePopup(event) {
        event.stopPropagation();

        this.setState((state) => ({
            ...state,
            visible: false,
        }));

        this.props.onClose();
    }

    render() {
        const { visible } = this.state;
        const { title, children } = this.props;
        const hidden = !visible;

        return (
            <div className="c-popup" hidden={hidden}>
                <div className="c-popup__header">
                    <div className="c-popup__title">{title}</div>
                    <div className="c-popup__close" onClick={this.hidePopup}>
                        <svg className="ez-icon">
                            <use xlinkHref="/bundles/ezplatformadminui/img/ez-icons.svg#discard" />
                        </svg>
                    </div>
                </div>
                <div className="c-popup__content">{children}</div>
            </div>
        );
    }
}

PopupComponent.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

PopupComponent.defaultProps = {
    onClose: () => {},
};
