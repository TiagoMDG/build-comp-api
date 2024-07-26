const express = require("express");
const router = express.Router();
const competitionsController = require("../../controllers/v1/competitions");
const entriesController = require("../../controllers/v1/entries");

// Competition Routes
router.get("/competitions", competitionsController.getAll);
router.get("/competitions/:id", competitionsController.getOne);

module.exports = router;
