import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectedContentItemComponent from './selected.content.item.component';
import SelectedContentPopupComponent from './selected.content.popup.component';

import './css/selected.content.component.css';

export default class SelectedContentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopupVisible: false,
        };

        this.togglePopup = this.togglePopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.renderSelectedItem = this.renderSelectedItem.bind(this);
    }

    /**
     * Toggles popup visible state
     *
     * @method togglePopup
     * @memberof SelectedContentComponent
     */
    togglePopup() {
        this.setState((state) => ({
            ...state,
            isPopupVisible: !state.isPopupVisible,
        }));
    }

    /**
     * Hides popup
     *
     * @method hidePopup
     * @memberof SelectedContentComponent
     */
    hidePopup() {
        this.setState((state) => ({
            ...state,
            isPopupVisible: false,
        }));
    }

    /**
     * Renders a selected content item
     *
     * @method renderSelectedItem
     * @param {Object} item
     * @returns {Element}
     * @memberof SelectedContentComponent
     */
    renderSelectedItem(item) {
        const { onItemRemove, contentTypesMap, labels } = this.props;

        return (
            <SelectedContentItemComponent
                key={item.remoteId}
                data={item}
                onRemove={onItemRemove}
                contentTypesMap={contentTypesMap}
                labels={labels.selectedContentItem}
            />
        );
    }

    /**
     * Renders a limit information label
     *
     * @method renderLimitLabel
     * @returns {Element}
     * @memberof SelectedContentComponent
     */
    renderLimitLabel() {
        const { itemsLimit, labels } = this.props;

        if (!itemsLimit) {
            return null;
        }

        const limitInfoTemplate = labels.selectedContent.limit;
        const limitInfo = limitInfoTemplate.replace('{items}', itemsLimit);

        return <small className="c-selected-content__label--limit">{limitInfo}</small>;
    }

    /**
     * Renders selected items info
     *
     * @method renderSelectedItems
     * @returns {Element}
     * @memberof SelectedContentComponent
     */
    renderSelectedItems() {
        const { items } = this.props;

        if (!items.length) {
            return null;
        }

        const { isPopupVisible } = this.state;
        const title = this.getTitle();

        return (
            <SelectedContentPopupComponent title={title} visible={isPopupVisible} onClose={this.hidePopup}>
                {items.map(this.renderSelectedItem)}
            </SelectedContentPopupComponent>
        );
    }

    /**
     * Gets component title
     *
     * @method getTitle
     * @returns {String}
     * @memberof SelectedContentComponent
     */
    getTitle() {
        const { labels, items } = this.props;
        const baseTitle = labels.selectedContent.confirmedItems;
        const total = items.length;
        const totalInfo = !!total ? `(${total})` : '';

        return `${baseTitle} ${totalInfo}`;
    }

    render() {
        const { items, labels } = this.props;
        const titles = items.map((item) => item.ContentInfo.Content.Name).join(', ');
        const contentNames = titles.length ? titles : labels.selectedContent.noConfirmedContent;

        return (
            <div className="c-selected-content" onClick={this.togglePopup}>
                {this.renderSelectedItems()}
                <strong className="c-selected-content__title">{this.getTitle()}</strong>
                {this.renderLimitLabel()}
                <div className="c-selected-content__content-names">{contentNames}</div>
            </div>
        );
    }
}

SelectedContentComponent.propTypes = {
    items: PropTypes.array.isRequired,
    multiple: PropTypes.bool.isRequired,
    itemsLimit: PropTypes.number.isRequired,
    onItemRemove: PropTypes.func.isRequired,
    contentTypesMap: PropTypes.object.isRequired,
    labels: PropTypes.shape({
        selectedContentItem: PropTypes.object.isRequired,
        selectedContent: PropTypes.shape({
            confirmedItems: PropTypes.string.isRequired,
            limit: PropTypes.string.isRequired,
            noConfirmedContent: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};
