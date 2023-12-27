var express = require("express");
const passport = require("passport");
var router = express.Router();
const taskController = require("../../controllers/task/taskController");
const {
  taskValidation,
  updateTaskStatusValidation,
} = require("../../validations/Task/taskValidations");

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    taskController.getTasks
  );
router
  .route("/")
  .post(
    taskValidation,
    helper.validate,
    passport.authenticate("jwt", { session: false }),
    taskController.addTask
  );
router
  .route("/:task_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    taskController.getTask
  );
router
  .route("/")
  .put(
    [...taskValidation, ...updateTaskStatusValidation],
    helper.validate,
    passport.authenticate("jwt", { session: false }),
    taskController.updateTask
  );

router
  .route("/update-status")
  .put(
    updateTaskStatusValidation,
    helper.validate,
    passport.authenticate("jwt", { session: false }),
    taskController.updateTask
  );
router
  .route("/:task_id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    taskController.deleteTask
  );

module.exports = {
  router: router,
  basePath: "task",
};
