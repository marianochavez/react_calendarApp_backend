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
    check("title", "Ingresa el título").not().isEmpty(),
    check("start", "Fecha de inicio necesaria").not().isEmpty(),
    check("start", "Fecha de inicio no es una fecha válida").isISO8601().toDate(),
    check("end", "Fecha de finalización necesaria").not().isEmpty(),
    check("end", "Fecha fin no es una fecha válida").isISO8601().toDate(),
    fieldValidator,
  ],
  createEvent
);

// update event
router.put("/:id", updateEvent);

// delete event
router.delete("/:id", deleteEvent);

module.exports = router;
