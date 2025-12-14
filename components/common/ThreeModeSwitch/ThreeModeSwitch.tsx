'use client';
import React from 'react';
import './ThreeModeSwitch.scss';
import type { TTranslationMode } from '@/types/common';

type Props = {
  label: string;
  onChange: (value: TTranslationMode) => void;
  value: TTranslationMode;
};

type State = { mode: TTranslationMode };

/**
 *
 */
class ThreeModeSwitch extends React.PureComponent<Props, State> {
  state: State = { mode: this.props.value };

  /**/
  handleLabel = () => {
    let mode;
    switch (this.state.mode) {
      case '1':
        mode = '2';
        break;
      case '2':
        mode = '3';
        break;
      case '3':
        mode = '1';
        break;
      default:
        mode = '3';
    }

    this.emitChange(mode);
  };

  /**/
  handleLeft = () => {
    let mode;
    switch (this.state.mode) {
      case '1':
        mode = '3';
        break;
      case '2':
        mode = '1';
        break;
      case '3':
        mode = '1';
        break;
      default:
        mode = '3';
    }

    this.emitChange(mode);
  };

  /**/
  handleRight = () => {
    let mode;
    switch (this.state.mode) {
      case '1':
        mode = '2';
        break;
      case '2':
        mode = '3';
        break;
      case '3':
        mode = '2';
        break;
      default:
        mode = '3';
    }

    this.emitChange(mode);
  };

  /**/
  emitChange(mode: TTranslationMode): void {
    this.setState({ mode });
    this.props.onChange(mode);
  }

  /**/
  render() {
    return (
      <span className="ThreeModeSwitch" mode={this.state.mode}>
        <span className="wrap">
          <span
            className="pill"
            tabIndex="0"
            role="group"
            aria-label="three-mode-pill"
          >
            <span className="fill" />

            <span className="slot left" onClick={this.handleLeft}>
              <span className="dot left">
                <span className="left-label">
                  <span className="icon left" />
                </span>
              </span>
            </span>

            <span className="slot right" onClick={this.handleRight}>
              <span className="dot right">
                <span className="right-label">
                  <span className="icon right" />
                </span>
              </span>
            </span>
          </span>

          <span className="label-text" onClick={this.handleLabel}>
            {this.props.label}
          </span>
        </span>
      </span>
    );
  }
}

/**/
ThreeModeSwitch['defaultProps'] = {
  onChange: console.log
};
export default ThreeModeSwitch;


/**
 * Declaration of the three-way-switch Web component.
 */
/*const tpl = document.createElement('template');
const pathsToImages =
  typeof locals !== undefined ? locals.pathsToImages : '/img';
tpl.innerHTML = `
    <span class="wrap">
        <span class="pill" tabindex="0" role="group" aria-label="three-mode-pill">
        <span class="fill"></span>

        <span class="slot left">
            <span class="dot left">
            <span class="left-label">
                <span class='icon left'></span>
            </span>
            </span>
        </span>

        <span class="slot right">
            <span class="dot right">
            <span class="right-label">
                <span class='icon right'></span>
            </span>
            </span>
        </span>
        </span>

        <span class="label-text"></span>
    </span>
    `;*/

/**

class ThreeModeSwitch extends HTMLElement {
  static EVENT_NAME = 'switch_change';

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(tpl.content.cloneNode(true));

    // Load from localStorage.
    // this.mode = getSongDisplayMode() || 3;
    this.mode = 3;
    this.$labelText = this._shadow.querySelector('.label-text');
  }

  connectedCallback() {
    const leftSlot = this._shadow.querySelector('.slot.left');
    const rightSlot = this._shadow.querySelector('.slot.right');
    leftSlot.addEventListener('click', this._onLeftClick);
    rightSlot.addEventListener('click', this._onRightClick);

    this.$labelText.textContent = this.getAttribute('label') || '...';
    this.$labelText.addEventListener('click', this._onLabelClick);

    this.style.webkitUserSelect = 'none';
    this._render();
  }

  _render() {
    this.setAttribute('mode', String(this.mode));
  }

  _emitChange() {
    this.dispatchEvent(
      new CustomEvent(ThreeModeSwitch.EVENT_NAME, {
        detail: { value: this.mode },
        bubbles: true,
        composed: true
      })
    );
  }

  _onLabelClick = (e) => {
    switch (this.mode) {
      case 1:
        this.mode = 2;
        break;
      case 2:
        this.mode = 3;
        break;
      case 3:
        this.mode = 1;
        break;
      default:
        this.mode = 3;
    }

    this._render();
    this._emitChange();
  };

  _onLeftClick = (e) => {
    switch (this.mode) {
      case 1:
        this.mode = 3;
        break;
      case 2:
        this.mode = 1;
        break;
      case 3:
        this.mode = 1;
        break;
      default:
        this.mode = 3;
    }

    this._render();
    this._emitChange();
  };

  _onRightClick = (e) => {
    switch (this.mode) {
      case 1:
        this.mode = 2;
        break;
      case 2:
        this.mode = 3;
        break;
      case 3:
        this.mode = 2;
        break;
      default:
        this.mode = 3;
    }

    this._render();
    this._emitChange();
  };
}
**/
/**/
// customElements.define('three-mode-switch', ThreeModeSwitch);
