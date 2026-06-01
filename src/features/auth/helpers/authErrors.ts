import type { AuthError } from "@supabase/supabase-js";

export const getAuthErrorSignInMessage = (error: AuthError) => {
  switch (error.code) {
    case "invalid_credentials":
      return "Incorrect email or password";
    case "over_request_rate_limit":
      return "Too many attempts. Please wait";
    default:
      return "Something went wrong. Please try again";
  }
};

export const getAuthErrorSignUpMessage = (error: AuthError) => {
  switch (error.code) {
    case "user_already_exists":
      return "User already registered. Please sign in or use a different email";
    case "validation_failed":
      return "Invalid email address";
    case "over_request_rate_limit":
      return "Too many attempts. Please wait";
    default:
      return "Failed to create account. Please try again";
  }
};
