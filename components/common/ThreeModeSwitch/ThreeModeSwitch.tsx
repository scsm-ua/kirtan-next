'use client';
import React from 'react';
import './ThreeModeSwitch.scss';
import { VIEW_MODE } from '@/types/common';
import type { TViewMode } from '@/types/common';

type Props = {
  label: string;
  onChange: (value: TViewMode) => void;
  value: TViewMode;
};

// Positional id used purely for CSS layout:
//   '1' = left half filled  (verse only)
//   '2' = right half filled (translation only)
//   '3' = full bar filled   (all)
type TPos = '1' | '2' | '3';

const VIEW_TO_POS: Record<TViewMode, TPos> = {
  [VIEW_MODE.VERSE]: '1',
  [VIEW_MODE.TRANSLATION]: '2',
  [VIEW_MODE.ALL]: '3'
};

const POS_TO_VIEW: Record<TPos, TViewMode> = {
  '1': VIEW_MODE.VERSE,
  '2': VIEW_MODE.TRANSLATION,
  '3': VIEW_MODE.ALL
};

// Tap-label cycle: verse → translation → all → verse…
const LABEL_CYCLE: Record<TPos, TPos> = { '1': '2', '2': '3', '3': '1' };

// Click on the left half: expand to all if verse is already selected,
// otherwise switch to verses only.
const LEFT_NEXT: Record<TPos, TPos> = { '1': '3', '2': '1', '3': '1' };

// Click on the right half: expand to all if translation is already selected,
// otherwise switch to translation only.
const RIGHT_NEXT: Record<TPos, TPos> = { '1': '2', '2': '3', '3': '2' };

type State = { pos: TPos };

/**
 *
 */
class ThreeModeSwitch extends React.PureComponent<Props, State> {
  state: State = { pos: VIEW_TO_POS[this.props.value] ?? '3' };

  /**/
  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    const nextPos = VIEW_TO_POS[props.value] ?? '3';
    return nextPos !== state.pos ? { pos: nextPos } : null;
  }

  /**/
  handleLabel = () => this.emitPos(LABEL_CYCLE[this.state.pos]);

  /**/
  handleLeft = () => this.emitPos(LEFT_NEXT[this.state.pos]);

  /**/
  handleRight = () => this.emitPos(RIGHT_NEXT[this.state.pos]);

  /**/
  emitPos(pos: TPos): void {
    this.setState({ pos });
    this.props.onChange(POS_TO_VIEW[pos]);
  }

  /**/
  render() {
    return (
      <span className="ThreeModeSwitch" data-mode={this.state.pos}>
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
