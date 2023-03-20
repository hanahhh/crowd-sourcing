import Roles from "./configs/roles";
import CreateHIT from "./view/requester/adminHIT/CreateHIT";
import ManageBatch from "./view/requester/manage/ManageBatch";
import ViewBatchDetail from "./view/requester/manage/ViewBatchDetail";
import EditProject from "./view/requester/project/EditProject";
import ProjectList from "./view/requester/project/ProjectList";
import PublishProject from "./view/requester/project/PublishProject";
import WorkerList from "./view/requester/worker/WorkerList";
import Dashboard from "./view/worker/dashboard/Dashboard";
import AcceptHit from "./view/worker/hits/AcceptHit";
import HITs from "./view/worker/hits/HITs";
import ReviewHit from "./view/worker/hits/ReviewHit";
import WokerAccount from "./view/worker/workeracc/WokerAccount";

const routes = [
  {
    path: "/requester/dashboard",
    exact: true,
    component: ProjectList,
    name: "Batch list",
    permission: [Roles.REQUESTER],
  },
  {
    path: "/requester/publish/:project_id",
    exact: true,
    component: PublishProject,
    name: "Publish batch",
    permission: [Roles.REQUESTER],
  },
  {
    path: "/requester/create",
    exact: true,
    component: CreateHIT,
    name: "Create HIT",
    permission: [Roles.REQUESTER],
  },
  {
    path: "/requester/manage",
    exact: true,
    component: ManageBatch,
    name: "Manage batch",
    permission: [Roles.REQUESTER],
  },
  {
    path: "/requester/manage/:id",
    exact: true,
    component: ViewBatchDetail,
    name: "Batch detail",
    permission: [Roles.REQUESTER],
  },
  {
    path: "/project/detail/:id",
    exact: true,
    component: EditProject,
    name: "Edit project",
    permission: [Roles.REQUESTER],
  },
  {
    path: "/workers",
    exact: true,
    component: WorkerList,
    name: "Worker list",
    permission: [Roles.REQUESTER],
  },
  {
    path: "/worker/dashboard",
    exact: true,
    component: Dashboard,
    name: "Dashboard Worker",
    permission: [Roles.WORKER],
  },
  {
    path: "/worker/hits",
    exact: true,
    component: HITs,
    name: "Hits worker",
    permission: [Roles.WORKER],
  },
  {
    path: "/worker/workeracc",
    exact: true,
    component: WokerAccount,
    name: "WokerAccount",
    permission: [Roles.WORKER],
  },
  {
    path: "/worker/accept/:project_id",
    exact: true,
    component: AcceptHit,
    name: "Review Hit",
    permission: [Roles.WORKER],
  },
  {
    path: "/worker/preview/:project_id",
    exact: true,
    component: ReviewHit,
    name: "Review Hit",
    permission: [Roles.WORKER],
  },
];

export default routes;
