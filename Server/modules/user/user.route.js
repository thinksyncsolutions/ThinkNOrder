const router = require("express").Router();
const userController = require("./user.controller");

router.get("/users", userController.fetchUsers);
router.post("/users/create", userController.createUserByManager);
router.post("/users/branch/:branchId", userController.fetchUsersByBranch);
router.get("/users/branch/manager", userController.fetchUsersByBranchManager);
router.put("/users/manager/:id", userController.updateUserByManager);
router.put("/users/:id", userController.updateUser);
router.delete("/users/manager/:id", userController.deleteUserByManager);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;