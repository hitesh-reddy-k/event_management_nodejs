const { Event, User } = require("../Models/modelIndexing");
const { createEventSchema } = require("../Utitles/eventValadation");
const { sortEvents } = require("../Utitles/customSort");
const { Op } = require("sequelize");

exports.createEvent = async (req, res) => {
  try {
    const { error, value } = createEventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error })
    };

    const event = await Event.create(value);

    res.status(201).json({ eventId: event.id });
  } catch (err) {
    res.status(500).json({ message: "error in creating event", error: err.message });
  }
};


exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, { include: User });
    if (!event) {
        return res.status(404).json({ message: "event not found" })
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "error in fetching event", error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    const event = await Event.findByPk(eventId, { include: User });
    if (!event) {
        return res.status(404).json({ message: "event not found" })
    }


    if (new Date(event.dateTime) < new Date()){
      return res.status(400).json({ message: "Cannot register for past events" });
    }
    if (event.Users.length >= event.capacity){
      return res.status(400).json({ message: "Event is full" });
}
    const alreadyRegistered = await event.hasUser(userId);
    if (alreadyRegistered){
      return res.status(400).json({ message: "User already registered" });
}
    await event.addUser(userId);
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
}
    const registered = await event.hasUser(userId);
    if (!registered){
      return res.status(400).json({ message: "User not registered" });
}
    await event.removeUser(userId);
    res.status(200).json({ message: "Registration cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Cancellation failed", error: err.message });
  }
};


exports.listUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { dateTime: { [Op.gt]: new Date() } },
    });
    res.json(sortEvents(events));
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
};

exports.getEventStats = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, { include: User });
    if (!event) return res.status(404).json({ message: "Event not found" });

    const totalRegistrations = event.Users.length;
    const remainingCapacity = event.capacity - totalRegistrations;
    const percentUsed = ((totalRegistrations / event.capacity) * 100).toFixed(2);

    res.json({ totalRegistrations, remainingCapacity, percentUsed: `${percentUsed}%` });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};
