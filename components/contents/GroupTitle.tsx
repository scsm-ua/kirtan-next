'use client';
import React from 'react';

/**/
type Props = { title: string };

type State = Partial<{
  isAdjusted: boolean;
  width: number;
}>;

/**
 *
 */
class GroupTitle extends React.PureComponent<Props, State> {
  private static readonly STEP = 3;

  private content: HTMLDivElement;
  private height: number;

  state: State = {
    isAdjusted: false,
    width: null
  };

  /**/
  componentDidMount() {
    this.height = this.content.offsetHeight;
    const lh = getComputedStyle(this.content).lineHeight;

    if (this.height > parseInt(lh)) this.adjustWidth();
  }

  /**/
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    const { isAdjusted, width } = this.state;
    if (width === prevState.width || isAdjusted) return;

    if (this.content.offsetHeight > this.height) {
      this.setState({
        isAdjusted: true,
        width: width + GroupTitle.STEP
      });
    } else {
      this.adjustWidth();
    }
  }

  /**/
  refContent = (el) => (this.content = el);

  /**/
  adjustWidth() {
    setTimeout(() =>
      this.setState({ width: this.content.offsetWidth - GroupTitle.STEP })
    );
  }

  /**/
  render() {
    const style = { width: this.state.width };

    return (
      <div ref={this.refContent} style={style}>
        {this.props.title}
      </div>
    );
  }
}

/**/
export default GroupTitle;
