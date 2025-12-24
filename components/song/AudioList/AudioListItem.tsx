import { PureComponent } from 'react';
import Skeleton  from 'react-loading-skeleton';

import './AudioListItem.scss';
import AudioContentCollapse from '@/components/common/Collapse/AudioContentCollapse';
import AudioLoader from '@/components/song/AudioList/AudioLoader';
import type { TAudio } from '@/types/song';

/**/
type Props = {
  audio: TAudio;
  hasLibLoaded: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

type State = {
  hasIframeLoaded?: boolean;
  isOpen?: boolean;
};

/**
 *
 */
class AudioListItem extends PureComponent<Props, State> {
  state: State = {
    hasIframeLoaded: false,
    isOpen: false
  };

  /**/
  handleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  /**/
  handlePlayStart = () => this.setState({ hasIframeLoaded: true });

  /**/
  renderContent() {
    const { audio, hasLibLoaded } = this.props;
    const { hasIframeLoaded, isOpen } = this.state;

    if (!isOpen && !hasLibLoaded) return null;

    return (
      <div className="AudioListItem__content">
        {hasLibLoaded && (
          <AudioLoader
            isOpen={isOpen}
            onPlayStart={this.handlePlayStart}
            url={audio.embed_url}
          />
        )}
        {hasIframeLoaded || (
          <div className="AudioListItem__loader">
            <div className="AudioListItem__skeleton">
              <Skeleton
                circle
                containerClassName=""
                height={20}
                width={20}
              />

              <Skeleton
                containerClassName="AudioListItem__margin"
                height={20}
                width={70}
              />

              <Skeleton
                containerClassName=""
                height={20}
                width={200}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  /**/
  render() {
    const { isOpen } = this.state;
    const { audio, onOpenChange } = this.props;

    return (
      <div className="AudioListItem">
        <AudioContentCollapse
          onClick={this.handleOpen}
          onOpenChange={onOpenChange}
          open={isOpen}
          title={audio.title}
        >
          {this.renderContent()}
        </AudioContentCollapse>
      </div>
    );
  }
}

/**/
export default AudioListItem;
