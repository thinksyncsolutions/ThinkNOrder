const router = require("express").Router();
const branchController = require("./branch.controller");

router.get("/branches", branchController.fetchBranches);
router.post("/select-branch", branchController.selectBranch);

module.exports = router;