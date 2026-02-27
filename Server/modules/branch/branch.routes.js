const router = require("express").Router();
const branchController = require("./branch.controller");
const auth = require("../../middleware/auth");

router.get("/branches", auth, branchController.fetchBranches);
router.post("/select-branch", auth, branchController.selectBranch);

module.exports = router;