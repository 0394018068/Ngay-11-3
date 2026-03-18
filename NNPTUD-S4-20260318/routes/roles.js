var express = require("express");
var router = express.Router();

let roleModel = require("../schemas/roles");
let roleController = require('../controllers/roles');

// GET ALL
router.get("/", async (req, res) => {
    let roles = await roleModel.find({ deleted: false });
    res.json(roles);
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        let role = await roleModel.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE
router.post("/", async (req, res) => {
    try {
        let newRole = new roleModel(req.body);
        await newRole.save();
        res.json(newRole);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        let role = await roleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// SOFT DELETE
router.delete("/:id", async (req, res) => {
    try {
        let role = await roleModel.findByIdAndUpdate(
            req.params.id,
            { deleted: true },
            { new: true }
        );
        res.json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ⭐ QUAN TRỌNG: GET USERS BY ROLE
router.get("/:id/users", (req, res) => {
    roleController.getUsersByRole(req, res);
});

module.exports = router;