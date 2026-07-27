import React from "react";

// Lazy-loaded admin dashboard to reduce main bundle size
const AdminDashboard = React.lazy(() => import("../../pages/admin"));

export default AdminDashboard;