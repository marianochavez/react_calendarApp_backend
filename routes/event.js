/*
    Event Routes:
    - /api/events
*/
const { Router } = require("express");
const { jwtValidator } = require("../middlewares/jwtValidator");
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const router = Router();

// middleware for all routes
router.use(jwtValidator);

// get all events
router.get("/", [], getEvent);

// create event
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").not().isEmpty(),
    check("start", "Start date must be a valid date").isISO8601().toDate(),
    check("end", "End date is required").not().isEmpty(),
    check("end", "End date must be a valid date").isISO8601().toDate(),
    fieldValidator,
  ],
  createEvent
);

// update event
router.put("/:id", updateEvent);

// delete event
router.delete("/:id", deleteEvent);

module.exports = router;
