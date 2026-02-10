const router = require("express").Router();
const userController = require("./user.controller");

router.get("/users", userController.fetchUsers);
router.post("/users/branch/:branchId", userController.fetchUsersByBranch);

module.exports = router;