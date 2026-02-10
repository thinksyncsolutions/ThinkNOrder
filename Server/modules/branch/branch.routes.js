const router = require("express").Router();
const branchController = require("./branch.controller");

router.get("/branches", branchController.fetchBranches);

module.exports = router;