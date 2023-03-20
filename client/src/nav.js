import Roles from "./configs/roles";
const nav = [
  {
    name: "Dashboard",
    to: "/requester/dashboard",
    permission: [Roles.REQUESTER],
  },
  {
    name: "Create",
    to: "/requester/create",
    permission: [Roles.REQUESTER],
  },
  {
    name: "Manage",
    to: "/requester/manage",
    permission: [Roles.REQUESTER],
  },

  {
    name: "HITs",
    to: "/worker/hits",
    permission: [Roles.WORKER],
  },
  {
    name: "Dashboard",
    to: "/worker/dashboard",
    permission: [Roles.WORKER],
  },
  {
    name: "WK_name",
    to: "/worker/workeracc",
    permission: [Roles.WORKER],
  },
  {
    name: "Worker",
    to: "/workers",
    permission: [Roles.REQUESTER],
  },
  {
    name: "Logout",
    to: "/login",
    permission: [Roles.REQUESTER, Roles.WORKER],
  },
];

export default nav;
