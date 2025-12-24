'use client';
import { PureComponent } from 'react';

import './AudioList.scss';
import AudioContentCollapse from '@/components/common/Collapse/AudioContentCollapse';
import type { TAudio } from '@/types/song';
import AudioListItem from '@/components/song/AudioList/AudioListItem';

/**/
type Props = {
  audios: Array<TAudio>;
};

type State = {
  hasLibLoaded: boolean;
};

/**
 *
 */
class AudioList extends PureComponent<Props, State> {
  private static readonly LIB_URL = 'https://w.soundcloud.com/player/api.js';
  state: State = { hasLibLoaded: false };

  /**/
  handleOpen = (isOpen: boolean) => {
    if (!isOpen || this.state.hasLibLoaded) return;

    const script = document.createElement('script');
    script.src = AudioList.LIB_URL;
    script.onload = (e) => this.onLibLoad(e);
    script.onerror = window.console.error;
    document.body.appendChild(script);
  };

  /**/
  onLibLoad = (e) => {
    console.log(e);
    this.setState({ hasLibLoaded: true });
  };

  /**/
  render() {
    return (
      <div className="AudioList">
        <ul className="AudioList__list">
          {this.props.audios.map((audio: TAudio) => (
            <AudioListItem
              audio={audio}
              hasLibLoaded={this.state.hasLibLoaded}
              key={audio.embed_url}
              onOpenChange={this.handleOpen}
            />
          ))}

          {/*<AudioContentCollapse*/}
          {/*  */}
          {/*  title="Here the sound!"*/}
          {/*>*/}
          {/*  Music track*/}
          {/*</AudioContentCollapse>*/}
        </ul>
      </div>
    );
  }
}

/**/
export default AudioList;
