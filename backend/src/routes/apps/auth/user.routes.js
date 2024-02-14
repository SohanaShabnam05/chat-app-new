import { Router } from "express";
import passport from "passport";
import { UserRolesEnum } from "../../../constants.js";
import {
  assignRole,
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  handleSocialLogin,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  updateUserAvatar,
  verifyEmail,
} from "../../../controllers/apps/auth/user.controllers.js";
import {
  verifyJWT,
  verifyPermission,
} from "../../../middlewares/auth.middlewares.js"; // import the passport config

import { validate } from "../../../validators/validate.js";
import { upload } from "../../../middlewares/multer.middlewares.js";
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";

const router = Router();

// Unsecured route
router.route("/register").post(validate, registerUser);
router.route("/login").post(validate, loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/forgot-password").post(validate, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(validate, resetForgottenPassword);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(verifyJWT, validate, changeCurrentPassword);
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);
router.route("/assign-role/:userId").post(
  verifyJWT,
  verifyPermission([UserRolesEnum.ADMIN]),
  mongoIdPathVariableValidator("userId"),

  validate,
  assignRole
);

// SSO routes
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("redirecting to google...");
  }
);

router.route("/github").get(
  passport.authenticate("github", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("redirecting to github...");
  }
);

router
  .route("/google/callback")
  .get(passport.authenticate("google"), handleSocialLogin);

router
  .route("/github/callback")
  .get(passport.authenticate("github"), handleSocialLogin);

export default router;
