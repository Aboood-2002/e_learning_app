import { passwordActions } from "../slices/passwordSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Forgot Password
export function sendResetCode(email) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/password/forgot-password", {
        email,
      });
      toast.success(data.message);
      dispatch(passwordActions.setStep("code")); // ✅ this moves to next step
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Get Reset Password
export function verifyResetCode(email, code) {
  return async (dispatch) => {
    try {
      await request.post(`/api/password/verify-code`, {
       email, code 
      });
      dispatch(passwordActions.setStep("password")); // ✅ move to password step
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      dispatch(passwordActions.setError());
    }
  };
}

// Reset The Password
export function resetPassword(email, password, confirmPassword) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/password/reset-password`, {
        email,
        password,
        confirmPassword,
      });
      toast.success(data.message);

      // ✅ Show success screen
      dispatch(passwordActions.setStep("success"));

      // ✅ Wait 5 seconds, then reset flow back to email step
      setTimeout(() => {
        dispatch(passwordActions.resetSteps());
      }, 5000); // 5 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}
