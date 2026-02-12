const router = require("express").Router();
const userController = require("./user.controller");

router.get("/users", userController.fetchUsers);
router.post("/users/branch/:branchId", userController.fetchUsersByBranch);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;