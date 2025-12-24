import { type ReactNode } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import type { CollapsibleProps } from '@radix-ui/react-collapsible';

import './Collapse.scss';

/**/
export type CollapseProps = CollapsibleProps & {
  children: ReactNode | ReactNode[];
  trigger?: ReactNode;
};

/**
 *
 */
function Collapse({ children, trigger, ...rest }: CollapseProps) {
  return (
    <Collapsible.Root className="Collapse" {...rest}>
      {trigger && (
        <Collapsible.Trigger asChild>{trigger}</Collapsible.Trigger>
      )}

      <Collapsible.Content className="Collapse__content">
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

/**/
export default Collapse;
