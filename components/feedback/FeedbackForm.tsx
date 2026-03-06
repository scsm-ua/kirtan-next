import FormInner from '@/components/feedback/FormInner';
import { translate } from '@/other/i18n';

/**/
type Props = {
  bookId: string;
};

/**
 *
 */
function FeedbackForm({ bookId }: Props) {
  return (
    <div>
      <h3 className="FeedbackWidget__title">Your feedback / report</h3>
      <FormInner bookId={bookId} />
    </div>
  );
}

/**/
export default FeedbackForm;
