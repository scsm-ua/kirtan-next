import { useState } from 'react';

import FormInner from '@/components/feedback/FormInner';
import type { TFeedbackTranslations } from '@/types/translations';

/**/
type Props = {
  translations: TFeedbackTranslations;
};

/**
 *
 */
function FeedbackForm({ translations: t }: Props) {
  const [isFinished, setFinished] = useState<boolean>(false);
  const handleFinished = () => setFinished(true);

  if (isFinished) {
    return <div className="FeedbackWidget__finished">{t.TU_MESSAGE}</div>;
  }

  return (
    <div>
      <div className="FeedbackWidget__appeal">{t.APPEAL}</div>
      <FormInner onFinish={handleFinished} translations={t} />
    </div>
  );
}

/**/
export default FeedbackForm;
