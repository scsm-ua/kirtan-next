import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { translate } from '@/other/i18n';
import {
  FORM_INIT, MAX_IMAGE_SIZE,
  onFeedbackSubmit,
  type TSubmitFormData
} from '@/components/feedback/helpers';
import FormField from '@/components/common/form/FormField/FormField';
import { FileDropzone } from '@/components/common/form/upload/FileDropzone/FileDropzone';
import FileUpload from '@/components/common/form/upload/FileUpload/FileUpload';

type Props = {
  // bookId: string;
  // onSubmit: (values: TSubmitFormData) => void;
};

/**
 *
 */
function FormInner({ bookId }: Props) {
  const [file, setFile] = useState<File>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<TSubmitFormData>(FORM_INIT);

  const onFile = (file: File | null) => {
    setFile(file);
    file || setError('image', null);
  };

  const onSubmit = (data: TSubmitFormData) => {
    if (file && !file.type.startsWith('image/')) {
      return setError('image', {
        type: 'filetype',
        message: 'Only image files are accepted.'
      });
    }
    if (file?.size > MAX_IMAGE_SIZE) {
      return setError('image', {
        type: 'filesize',
        message: 'Max image size is 2MB.'
      });
    }
    onFeedbackSubmit(data, file);
  };

  return (
    <form
      className="FeedbackWidget__form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField label="Name" name="name" zodError={errors}>
        <input
          autoFocus
          className="AppTextInput AppTextInput--gray"
          id="name"
          type="text"
          {...register('name')}
        />
      </FormField>

      <FormField label="E-mail" name="email" zodError={errors}>
        <input
          className="AppTextInput AppTextInput--gray"
          id="email"
          type="email"
          {...register('email')}
        />
      </FormField>

      <FormField
        inputClassName="FormField__input--large"
        label="Message"
        name="message"
        zodError={errors}
      >
        <textarea
          className="AppTextInput AppTextInput--area"
          id="message"
          {...register('message')}
          rows="3"
        />
      </FormField>

      <FileUpload errors={errors} file={file} onFile={onFile} />

      <div className="FeedbackWidget__footer">
        <input className="AppButton FeedbackWidget__submit" type="submit" value="Send feedback" />
      </div>
    </form>
  );
}

/**/
export default FormInner;
