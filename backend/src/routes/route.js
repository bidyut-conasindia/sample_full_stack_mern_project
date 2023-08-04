const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/adduser", userController.addUserDeatils);
router.get('/getuser', userController.getUserDetails);
router.put('/updateuser', userController.updateUserDeatils);
router.delete('/deleteuser', userController.deleteUserDetails);

module.exports = router;
