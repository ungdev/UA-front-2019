import { ReactNode } from 'react';
import Icon from '../UI/Icon';

/**
 * A container component that displays a title and content in a box.
 */
function BoxContainer({
  title,
  children,
  padding = true,
  color = 'pink',
  className = '',
}: {
  /** The title to display in the box. */
  title: string;
  /** The content to display in the box. */
  children: ReactNode;
  /** Is the box content padded ? */
  padding?: boolean;
  /** The color of the top of the box */
  color?: 'pink' | 'blue';
  /** The class of the component */
  className?: string;
}) {
  return (
    <div className={`box-container ${className}`}>
      <div className={`box-title ${color}`}>
        <Icon name="cross" strokeWidth={4} />
        {title}
      </div>
      <div className={'box-content ' + (!padding ? 'no-padding' : '')}>{children}</div>
    </div>
  );
}

export default BoxContainer;
