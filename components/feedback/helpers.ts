import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

/**/
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE = 2097152; // 2MB

const CHAT_ID = -1003735575930;
const TOKEN = '8651091209:AAFp34KDkoZ8iaZtGWnPS7UglRUxns_yF8g';

const schema = z.object({
  email: z
    .email('Invalid email address.')
    .optional()
    .or(z.literal('')),
  // image: z
  //   .instanceof(FileList)
  //   .nullable()
  //   .optional()
  //   .refine(
  //     (files) => !files || files?.[0]?.size <= MAX_IMAGE_SIZE,
  //     'Max image size is 5MB.'
  //   )
  //   .refine(
  //     (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     'Only .jpg, .jpeg, .png and .webp formats are supported.'
  //   ),
  message: z
    .string()
    .min(5, 'Message requires at least 5 symbols.')
    .max(1000, 'Message can be at most 1000 symbols.'),
  name: z
    .string()
    .max(80, 'Name can be at most 80 symbols.')
}) as any;

const DEFAULT_VALUES: TSubmitFormData = {
  email: '',
  image: null,
  message: '',
  name: ''
};

/**/
export const FORM_INIT = {
  defaultValues: DEFAULT_VALUES,
  resolver: zodResolver(schema)
} as any;

/**/
export type TSubmitFormData = z.infer<typeof schema>;

/**
 *
 */
export function onFeedbackSubmit(data: TSubmitFormData, file: File) {
  console.info(data);

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      parse_mode: 'Markdown',
      text: buildTextBody(data)
    })
  })
    .catch(console.error);

  if (!file) return;

  const fd = new FormData();
  fd.append('chat_id', CHAT_ID);
  fd.append('photo', file);

  fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
    method: 'POST',
    body: fd
  } as any)
    .catch(console.error);
}

/**
 *
 */
function buildTextBody(data: TSubmitFormData): string {
  let text = `*Message:* ${data.message}`;

  if ('email' in data) {
    text = `*Email:* ${data.email}\n` + text;
  }
  if ('name' in data) {
    text = `*Name:* ${data.name}\n` + text;
  }

  return text + `\n*href:* ${window.location.href}`;
}
