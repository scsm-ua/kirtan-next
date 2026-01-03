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
      <span className="ThreeModeSwitch" data-mode={this.state.mode}>
        <span className="wrap">
          <span
            className="pill"
            tabIndex={0}
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
