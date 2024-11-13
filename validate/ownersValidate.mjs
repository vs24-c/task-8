import { body, validationResult } from "express-validator";

class OwnersValidate {
  static ownerValidationRules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({min: 3, max: 15})
      .withMessage('Name must be between 3 and 15 characters long')
      .trim()
      .escape(),
    body('surname')
      .notEmpty()
      .withMessage('Surname is required')
      .isLength({min: 3, max: 15})
      .withMessage('Surname must be between 3 and 15 characters long')
      .trim()
      .escape(),
    body('address')
      .notEmpty()
      .withMessage('address is required')
      .isLength({min: 3, max: 50})
      .withMessage('address must be between 3 and 50 characters long')
      .trim()
      .escape(),
    body('age')
      .notEmpty()
      .withMessage('Age is required')
      .isInt({min: 12, max: 150})
      .withMessage('Age must be between 12 and 150')
      .trim()
      .escape(),
    body('profession')
      .notEmpty()
      .withMessage('Profession is required')
      .isLength({min: 3, max: 50})
      .withMessage('Profession must be between 3 and 50 characters long')
      .trim()
      .escape(),
    body('descriptio')
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 3, max: 255 })
      .withMessage('Description must be between 3 and 255 characters long')
      .trim()
     .escape(),
  ];
}

export default OwnersValidate;