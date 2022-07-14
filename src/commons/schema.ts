import joi from 'joi';
// eslint-disable-next-line import/prefer-default-export
export const VideoCreateSchema = joi.object({
  lang: joi
    .string()
    .required()
    .messages({
      'any.required': chrome.i18n.getMessage('CheckSubtitle_langRequired'),
    }),
});
