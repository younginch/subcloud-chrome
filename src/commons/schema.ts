import joi from 'joi';
// eslint-disable-next-line import/prefer-default-export
export const VideoCreateSchema = joi.object({
  lang: joi.string().required().messages({
    'any.required': `자막 언어를 선택해 주세요`,
  }),
});
