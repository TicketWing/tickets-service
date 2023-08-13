import Joi from "joi";
import { RegExps } from "../consts/regexps.consts";

export const searchValidationSchema = Joi.object({
  originLocationCode: Joi.string().regex(RegExps.code).required(),
  destinationLocationCode: Joi.string().regex(RegExps.code).required(),
  departureDate: Joi.string().regex(RegExps.date).required(),
  adults: Joi.number().min(1).required(),
  currencyCode: Joi.string().regex(RegExps.code).required(),
  max: Joi.number().min(1).optional(),
  sort: Joi.string().optional(),
});

export const addToFavoritesValidationSchema = Joi.object({
  ticket_id: Joi.string().required(),
});
