const User = require('../schemas/users');

// CREATE
exports.create = async (req, res) => {
    try {
        let user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET ALL (có search username)
exports.getAll = async (req, res) => {
    try {
        let filter = { deleted: false };

        if (req.query.username) {
            filter.username = {
                $regex: req.query.username,
                $options: 'i'
            };
        }

        let users = await User.find(filter).populate('role');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET BY ID
exports.getById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id).populate('role');
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// UPDATE
exports.update = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// SOFT DELETE
exports.delete = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            req.params.id,
            { deleted: true },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// ENABLE
exports.enable = async (req, res) => {
    try {
        let { email, username } = req.body;

        let user = await User.findOne({ email, username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = true;
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// DISABLE
exports.disable = async (req, res) => {
    try {
        let { email, username } = req.body;

        let user = await User.findOne({ email, username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = false;
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};