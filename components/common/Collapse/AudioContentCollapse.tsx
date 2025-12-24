'use client';
import classnames from 'classnames';
import { useState } from 'react';

import './AudioContentCollapse.scss';
import Collapse, {
  type CollapseProps
} from '@/components/common/Collapse/Collapse';

/**/
type Props = CollapseProps & {
  onClick: () => void;
  title: string;
};

type TriggerProps = {
  isOpen: boolean;
  onClick: () => void;
  title: string;
};

/**
 *
 */
function AudioContentCollapse({ title, ...props }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!isOpen);

  const trigger = (
    <Trigger isOpen={isOpen} onClick={handleOpen} title={title} />
  );

  return <Collapse {...props} open={isOpen} trigger={trigger} />;
}

/**
 *
 */
function Trigger({ isOpen, onClick, title }: TriggerProps) {
  const cls = classnames(
    'AudioContentCollapse__icon',
    isOpen && 'AudioContentCollapse__icon--rotate'
  );

  return (
    <button
      className="NoBorderButton AudioContentCollapse__button"
      onClick={onClick}
    >
      <span className={cls}>
        <span className="icon-shevron-right" />
      </span>

      <span className="AudioContentCollapse__title">{title}</span>
    </button>
  );
}

/**/
export default AudioContentCollapse;
