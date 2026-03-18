var express = require("express");
var router = express.Router();

let userController = require('../controllers/users');

// GET ALL + search username
router.get("/", (req, res) => {
    userController.getAll(req, res);
});

// GET BY ID
router.get("/:id", (req, res) => {
    userController.getById(req, res);
});

// CREATE
router.post("/", (req, res) => {
    userController.create(req, res);
});

// UPDATE
router.put("/:id", (req, res) => {
    userController.update(req, res);
});

// SOFT DELETE
router.delete("/:id", (req, res) => {
    userController.delete(req, res);
});

// ENABLE
router.post("/enable", (req, res) => {
    userController.enable(req, res);
});

// DISABLE
router.post("/disable", (req, res) => {
    userController.disable(req, res);
});

module.exports = router;