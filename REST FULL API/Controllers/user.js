const User = require('../Models/user');

async function handleGetAllUsers(req, res) {
    const DBS_Users = await User.find({});
    return res.json(DBS_Users);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });

}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastname: 'changed' });
    return res.json({ status: 'success' });
}
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: 'success' });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All Field Are Required..." })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title

    });
    console.log('Result: ', result)
    return res.status(201).json({ msg: "Success" });

}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}