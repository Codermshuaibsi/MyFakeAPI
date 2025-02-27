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
    try {
        if (
            !body ||
            !body.firstName ||
            !body.lastName ||
            !body.email ||
            !body.gender ||
            !body.jobTitle
        ) {
            return res.status(400).json({ msg: "All Fields Are Required..." });
        }


        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle
        });
        console.log('Result: ', result);
        return res.status(201).json({ msg: "Success" });
    } catch (error) {
        return res.status(500).json({ msg: "Error creating user", error: error.message });
    }
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}