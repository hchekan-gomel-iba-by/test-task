import React from "react";
import { Route } from "react-router-dom";

export const ProtectedRoute = ({ condition, ...props }) =>
  condition && <Route {...props} />;
