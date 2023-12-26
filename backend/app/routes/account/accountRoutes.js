var express = require("express");
var router = express.Router();
const accountController = require("../../controllers/account/accountController");
const {
  loginValidation,
  signUpValidation,
} = require("../../validations/Account/accountValidation");
const passport = require("passport");

router
  .route("/login")
  .post(loginValidation, helper.validate, accountController.login);
router
  .route("/")
  .post(signUpValidation, helper.validate, accountController.addUser);
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    accountController.getUsers
  );
router
  .route("/:user_id")
  .get(
    helper.validate,
    passport.authenticate("jwt", { session: false }),
    accountController.getUser
  );
router
  .route("/")
  .put(
    passport.authenticate("jwt", { session: false }),
    accountController.updateUser
  );
router
  .route("/:user_id")
  .delete(
    helper.validate,
    passport.authenticate("jwt", { session: false }),
    accountController.deleteUser
  );

module.exports = {
  router: router,
  basePath: "account",
};
