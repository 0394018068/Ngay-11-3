const User = require('../schemas/users');

// GET USERS BY ROLE
exports.getUsersByRole = async (req, res) => {
    try {
        let users = await User.find({
            role: req.params.id,
            isDeleted: false   // ✅ sửa đúng field
        }).populate('role');

        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            error: err.message
        });
    }
};