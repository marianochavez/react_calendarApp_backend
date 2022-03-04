const { response } = require("express");
const Event = require("../models/Event.model");

const getEvent = async (req, res = response) => {
  const events = await Event.find().populate("user", "name email");

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventSaved = await event.save();

    res.status(201).json({
      ok: true,
      eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the create event",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not authorized",
      });
    }

    const eventToUpdate = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, eventToUpdate, {
      new: true,
    });

    res.json({
      ok: true,
      eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the update event",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not authorized",
      });
    }

    const eventDeleted = await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      eventDeleted,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the delete event",
    });
  }
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
