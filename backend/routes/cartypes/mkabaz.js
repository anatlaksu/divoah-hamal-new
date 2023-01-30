const express = require("express");
const router = express.Router();

const {
	create,
	find,
	read,
	remove,
	findById,
	update,
	mkabazsbymagad,
	mkabazsbymatafcre,
	mkabazsbymatafengine,
	mkabazsbyrekem,
} = require("../../controllers/cartypes/mkabaz");

router.post("/mkabaz", create);
//! on tets /:id
// router.get("/mkabaz/mkabazsbymatafcre", mkabazsbymatafcre);
// router.get("/mkabaz/mkabazsbymatafengine", mkabazsbymatafengine);
// * ----------------------------------------------------------------
router.get("/mkabaz/mkabazsbyrekem/:id", mkabazsbyrekem);

router.get("/mkabaz/:id", findById);
router.get("/mkabaz", find);

router.get("/mkabaz/:id", read);

router.post("/mkabaz/update", update);

router.post("/mkabaz/remove/:id", remove);

router.get("/mkabaz/mkabazsbymagad/:magadid", mkabazsbymagad);

module.exports = router;
