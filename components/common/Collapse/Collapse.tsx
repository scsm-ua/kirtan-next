import { type ReactNode } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import type { CollapsibleProps } from '@radix-ui/react-collapsible';

import './Collapse.scss';

/**/
type Props = CollapsibleProps & {
  children: ReactNode | ReactNode[];
  trigger?: ReactNode;
};

/**
 *
 */
function Collapse({ children, trigger, ...rest }: Props) {
  return (
    <Collapsible.Root className="Collapse" {...rest}>
      {trigger && (
        <Collapsible.Trigger>{trigger}</Collapsible.Trigger>
      )}

      <Collapsible.Content className="Collapse__content">
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

/**/
export default Collapse;

// const CollapsibleDemo = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Collapsible.Root
//       className="CollapsibleRoot"
//       open={open}
//       onOpenChange={setOpen}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
// 				<span className="Text">
// 					@peduarte starred 3 repositories
// 				</span>
//         <Collapsible.Trigger asChild>
//           <button className="IconButton">
//             {open ? 'Open' : 'Collapsed'}
//           </button>
//         </Collapsible.Trigger>
//       </div>
//
//       <div className="Repository">
//         <span className="Text">@radix-ui/primitives</span>
//       </div>
//
//       <Collapsible.Content className="Collapsible__content">
//         <div className="Repository">
//           <span className="Text">@radix-ui/colors</span>
//         </div>
//         <div className="Repository">
//           <span className="Text">@radix-ui/themes</span>
//         </div>
//       </Collapsible.Content>
//     </Collapsible.Root>
//   );
// };
//  export { CollapsibleDemo };
