const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
    try {
        const newGroup = new Group(req.body);
        console.log("Received data:", req.body);
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().sort({ updatedAt: -1 });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).sort({ updatedAt: -1 });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Internal Server Error' }); // Respond with an error message
    }
};

exports.getGroupsByMeetingId = async (req, res) => {
    try {
        const meetingId = req.params.meeting_id; // Assuming the meeting_id is a URL parameter
        const groups = await Group.find({ meeting_id: meetingId }).sort({ updatedAt: -1 }); // Assuming 'meeting_id' is the field name in your Group model
        if (groups.length === 0) {
            return res.status(404).json({ message: 'No groups found for the given meeting_id' });
        }
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
