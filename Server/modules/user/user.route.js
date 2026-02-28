const router = require("express").Router();
const userController = require("./user.controller");
const auth = require("../../middleware/auth");

router.get("/users", auth, userController.fetchUsers);
router.post("/users/create", auth, userController.createUserByManager);
router.post("/users/branch/:branchId", auth, userController.fetchUsersByBranch);
router.get("/users/branch/manager", auth, userController.fetchUsersByBranchManager);
router.put("/users/manager/:id", auth, userController.updateUserByManager);
router.put("/users/:id", auth, userController.updateUser);
router.delete("/users/manager/:id", auth, userController.deleteUserByManager);
router.delete("/users/:id", auth, userController.deleteUser);

module.exports = router;