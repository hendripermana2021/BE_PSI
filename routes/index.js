import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import yaml from "js-yaml";
import {
  handleGetRoot,
  Login,
  getEmailPegawai,
  Logout,
  whoAmI,
  deletePegawai,
  RegisterPegawai,
  getDataPegawaiId,
  getDataPegawai,
  updateDataPegawai,
  getDataPegawaiBy,
  refreshToken,
} from "../controllers/HandlerUsers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  RegisterSantri,
  deleteSantri,
  getDataSantri,
  getDataSantriById,
  imageAppeared,
  updateDataSantri,
} from "../controllers/HandlerDataSantri.js";
import {
  createRoom,
  deleteRoom,
  getDataRoom,
  getDataRoomById,
  getRoomBy,
  updateRoom,
} from "../controllers/HandlerRoom.js";
import {
  createRole,
  deleteRole,
  getDataRole,
  getDataRoleById,
  getRoleBy,
  updateRole,
} from "../controllers/HandlerRole.js";
import {
  getDataNotification,
  getDataNotificationById,
} from "../controllers/HandlerNotification.js";
import {
  CalculatedROC,
  calculatedCPIByIdCalculated,
  calculatedCPIisNull,
  getReqCpiNull,
} from "../controllers/HandlerAction.js";
import {
  createKriteriaDanSub,
  deleteKriteriaDanSub,
  getDataKriteria,
  getDataKriteriaById,
  updateKriteriaDanSub,
} from "../controllers/HandlerKriteriaSubKriteria.js";
import {
  getDataPermissionById,
  getDataPermissionByUserId,
  addPermission,
  updatePermission,
  deletePermission,
  getDataPermissionForValidation,
  getDataPermissionOnlyAccepted,
  getDataPermissionAll,
  getApproval,
} from "../controllers/HandlerPermission.js";
import { dashboard } from "../controllers/HandlerDashboard.js";
import {
  validationGo,
  validationBack,
} from "../controllers/HandlerValidate.js";
import { generateReport } from "../controllers/HandlerReport.js";

export const prefix = "/v1/api/";

export const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image"); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

//DOCUMENTATION API
const swaggerDocument = yaml.load(fs.readFileSync("OpenAPI.yaml", "utf8"));

router.use(
  prefix + "api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

//ROUTES FOR GLOBAL
router.get(prefix, handleGetRoot);
router.get(prefix + "me", verifyToken, whoAmI);
router.post(prefix + "login", Login);
router.get(prefix + "token", refreshToken);
router.delete(prefix + "logout", verifyToken, Logout);
router.post(prefix + "action/calculatedROC", verifyToken, CalculatedROC);
router.post(prefix + "action/calculatedCPI", verifyToken, calculatedCPIisNull);
router.get(prefix + "result/CPI/:id", verifyToken, calculatedCPIByIdCalculated);
router.get(prefix + "report", verifyToken, generateReport);
router.get(prefix + "datareqByUser", verifyToken, getReqCpiNull);

//ROUTES FOR ADMINISTRATOR
//API FOR DASHBOARD
router.get(prefix + "dashboard", verifyToken, dashboard);

//API KRITERIA DAN SUB-KRITERIA
router.get(prefix + "kriteria", verifyToken, getDataKriteria);
router.get(prefix + "kriteria/byid/:id", verifyToken, getDataKriteriaById);
router.delete(
  prefix + "kriteria/delete/:id",
  verifyToken,
  deleteKriteriaDanSub
);
router.put(prefix + "kriteria/update/:id", verifyToken, updateKriteriaDanSub);
router.post(prefix + "kriteria/create", verifyToken, createKriteriaDanSub);
//END API KRITERIA DAN SUB-KRITERIA

//API PEGAWAI
router.get(prefix + "pegawai/email", verifyToken, getEmailPegawai);
router.get(prefix + "pegawai/byid/:id", verifyToken, getDataPegawaiId);
router.get(prefix + "pegawai/:search", verifyToken, getDataPegawaiBy);
router.get(prefix + "pegawai", verifyToken, getDataPegawai);
router.delete(prefix + "pegawai/delete/:id", verifyToken, deletePegawai);
router.post(prefix + "pegawai/register", verifyToken, RegisterPegawai);
router.put(prefix + "pegawai/update/:id", verifyToken, updateDataPegawai);

//API SANTRI
router.get(prefix + "santri", verifyToken, getDataSantri);
router.get(prefix + "santri/byid/:id", verifyToken, getDataSantriById);
router.post(
  prefix + "santri/register",
  verifyToken,
  upload.single("image"),
  RegisterSantri
);
router.put(
  prefix + "santri/update/:id",
  verifyToken,
  upload.single("image"),
  updateDataSantri
);
router.delete(prefix + "santri/delete/:id", verifyToken, deleteSantri);

//API ROOM
router.get(prefix + "room", verifyToken, getDataRoom);
router.get(prefix + "room/byid/:id", verifyToken, getDataRoomById);
router.get(prefix + "room/:search", verifyToken, getRoomBy);
router.post(prefix + "room/create", verifyToken, createRoom);
router.put(prefix + "room/update/:id", verifyToken, updateRoom);
router.delete(prefix + "room/delete/:id", verifyToken, deleteRoom);

//API ROLE
router.get(prefix + "role", verifyToken, getDataRole);
router.get(prefix + "role/byid/:id", verifyToken, getDataRoleById);
router.get(prefix + "role/:search", verifyToken, getRoleBy);
router.post(prefix + "role/create", verifyToken, createRole);
router.put(prefix + "role/update/:id", verifyToken, updateRole);
router.delete(prefix + "role/delete/:id", verifyToken, deleteRole);

//API NOTIFICATION
router.get(prefix + "notif", verifyToken, getDataNotification);
router.get(prefix + "notif/byid/:id", verifyToken, getDataNotificationById);

//API PERMISSION
router.get(
  prefix + "permission/notRejected",
  verifyToken,
  getDataPermissionOnlyAccepted
);
router.get(prefix + "permission/byid/:id", verifyToken, getDataPermissionById);
router.get(prefix + "approval", verifyToken, getApproval);
router.get(prefix + "permission", verifyToken, getDataPermissionByUserId);
router.get(prefix + "permission/all", verifyToken, getDataPermissionAll);
router.put(prefix + "permission/update/:id", verifyToken, updatePermission);
router.delete(prefix + "permission/delete/:id", verifyToken, deletePermission);
router.post(prefix + "permission/create", verifyToken, addPermission);

//ROUTES FOR PETUGAS KEAMANAN
router.put(prefix + "validation-go/:id", verifyToken, validationGo);
router.put(prefix + "validation-back/:id", verifyToken, validationBack);
router.get(
  prefix + "validation/student",
  verifyToken,
  getDataPermissionForValidation
);

export default router;
