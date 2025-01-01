import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import yaml from "js-yaml";
import {
  handleGetRoot,
  Login,
  getEmailUsers,
  Logout,
  whoAmI,
  deleteUsers,
  RegisterUsers,
  getDataUsersId,
  getDataUsers,
  updateDataUsers,
  getDataUsersBy,
  refreshToken,
  getDataUsersQueryRoleandRegion,
} from "../controllers/HandlerUsers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createDataProgramKriteria,
  createPrograms,
  deleteDataProgramsKriteria,
  deleteProgram,
  getDataKriteriaByPrograms,
  getDataPrograms,
  getDataProgramsById,
  getDataProgramsWithKriteria,
  getDataProgramsWithKriteriaById,
  updateProgram,
} from "../controllers/HandlerDataPrograms.js";

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
  CalculatedROCForArrangeMoney,
  calculatedPSIisNull,
} from "../controllers/HandlerAction.js";
import {
  createKriteriaDanSub,
  createSubKriteria,
  deleteKriteriaDanSub,
  deleteSubKriteria,
  getDataKriteria,
  getDataKriteriaAndSub,
  getDataKriteriaAndSubById,
  getDataKriteriaById,
  getDataKriteriaProgram,
  getDataSubKriteriaById,
  updateKriteriaDanSub,
  updateSubKriteria,
} from "../controllers/HandlerKriteriaSubKriteria.js";

import { dashboard } from "../controllers/HandlerDashboard.js";

import { generateReport } from "../controllers/HandlerReport.js";
import {
  createProvince,
  createRegion,
  createRegionDanSub,
  deleteRegion,
  deleteRegionDanSub,
  getDataProvince,
  getDataProvinceById,
  getDataRegion,
  getDataRegionAndProvince,
  getDataRegionById,
  getDataRegionByProvince,
  updateProvince,
  updateRegion,
  updateRegionDanSub,
} from "../controllers/HandlerRegional.js";

import {
  createAjuan,
  deleteAjuan,
  getDataAjuanById,
  getDataAjuanByProgram,
  getDataAjuanByProgramForGenerated,
  getDataAjuanOnlyAccepted,
  updateAjuan,
} from "../controllers/HandlerAjuan.js";

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
router.post(prefix + "login", Login);
router.delete(prefix + "logout", verifyToken, Logout);
router.get(prefix + "me", verifyToken, whoAmI);
router.get(prefix + "dashboard", verifyToken, dashboard);
router.get(prefix + "token", refreshToken);

//API PEGAWAI
router.get(prefix + "users/email", verifyToken, getEmailUsers);
router.get(prefix + "users/byid/:id", verifyToken, getDataUsersId);
router.get(prefix + "users/:search", verifyToken, getDataUsersBy);
router.get(prefix + "users", verifyToken, getDataUsers);
router.get(
  prefix + "users/condition/query",
  verifyToken,
  getDataUsersQueryRoleandRegion
);
router.delete(prefix + "users/delete/:id", verifyToken, deleteUsers);
router.post(prefix + "users/register", verifyToken, RegisterUsers);
router.put(prefix + "users/update/:id", verifyToken, updateDataUsers);

router.get(
  prefix + "action/calculatedPSI/:programId",
  verifyToken,
  calculatedPSIisNull
);
router.get(
  prefix + "action/calculatedROC/:programId",
  verifyToken,
  CalculatedROCForArrangeMoney
);
router.get(prefix + "report", verifyToken, generateReport);

//ROUTES FOR ADMINISTRATOR
//API FOR DASHBOARD

//API KRITERIA
router.get(prefix + "kriteria", verifyToken, getDataKriteria);
// router.get(prefix + "program-kriteria", verifyToken, getDataKriteriaProgram);
router.get(prefix + "kriteria/byid/:id", verifyToken, getDataKriteriaById);

//API SUB KRITERIA
//TODO : make sub-kriteria by kriteria ID
router.get(prefix + "kriteria-sub", verifyToken, getDataKriteriaAndSub);

//END API SUB KRITERIA

//API KRITERIA DAN SUB-KRITERIA
router.get(prefix + "kriteria-sub", verifyToken, getDataKriteriaAndSub);
router.get(
  prefix + "kriteria-sub/byid/:id",
  verifyToken,
  getDataKriteriaAndSubById
);
router.put(
  prefix + "kriteria-sub/update/:id",
  verifyToken,
  updateKriteriaDanSub
);
router.post(prefix + "kriteria-sub/create", verifyToken, createKriteriaDanSub);
router.delete(
  prefix + "kriteria-sub/delete/:id",
  verifyToken,
  deleteKriteriaDanSub
);
// END API KRITERIA

//AJUAN
router.get(prefix + "ajuan", verifyToken, getDataAjuanOnlyAccepted);
router.get(prefix + "ajuan/byid/:id", verifyToken, getDataAjuanById);
router.delete(prefix + "ajuan/delete/:id", verifyToken, deleteAjuan);
router.post(prefix + "ajuan/register", verifyToken, createAjuan);
router.put(prefix + "ajuan/update/:id", verifyToken, updateAjuan);
router.get(prefix + "ajuan/program/:id", verifyToken, getDataAjuanByProgram);
router.get(
  prefix + "ajuan/program/generated/:id",
  verifyToken,
  getDataAjuanByProgramForGenerated
);
//END AJUAN

//API SUB-KRITERIA
router.get(
  prefix + "sub-kriteria/byid/:id",
  verifyToken,
  getDataSubKriteriaById
);
router.delete(
  prefix + "sub-kriteria/delete/:id",
  verifyToken,
  deleteSubKriteria
);
router.put(prefix + "sub-kriteria/update/:id", verifyToken, updateSubKriteria);
router.post(prefix + "sub-kriteria/create", verifyToken, createSubKriteria);
//END API KRITERIA DAN SUB-KRITERIA

//API PROGRAMS
router.get(prefix + "program", verifyToken, getDataPrograms);
router.get(prefix + "program/byid/:id", verifyToken, getDataProgramsById);
router.post(prefix + "program/create", verifyToken, createPrograms);
router.put(prefix + "program/update/:id", verifyToken, updateProgram);
router.delete(prefix + "program/delete/:id", verifyToken, deleteProgram);
// END

//API FOR GET PROGRAM WITH ATTRIBUTE KRITERIA

router.get(
  prefix + "program-kriteria/:id",
  verifyToken,
  getDataProgramsWithKriteriaById
);

router.get(
  prefix + "program-kriteria/program/:id",
  verifyToken,
  getDataKriteriaByPrograms
);
router.get(
  prefix + "program-kriteria",
  verifyToken,
  getDataProgramsWithKriteria
);
router.post(
  prefix + "program-kriteria/create",
  verifyToken,
  createDataProgramKriteria
);
router.delete(
  prefix + "program-kriteria/delete/:id",
  verifyToken,
  deleteDataProgramsKriteria
);

//END API GET PROGRAM WITH ATTRIBUTE KRITERIA

//API REGIONAL
// router.get(prefix + "regional",verifyToken, getDataRegion);
router.get(prefix + "regional", verifyToken, getDataRegion);
router.get(prefix + "regional/byid/:id", verifyToken, getDataRegionById);
router.get(
  prefix + "regional/byprovince/:id",
  verifyToken,
  getDataRegionByProvince
);
router.post(prefix + "regional/create", verifyToken, createRegion);
router.put(prefix + "regional/update/:id", verifyToken, updateRegion);
router.delete(prefix + "regional/delete/:id", verifyToken, deleteRegion);

//API PROVINCE
router.get(prefix + "province", verifyToken, getDataProvince);
router.delete(prefix + "province/delete/:id", verifyToken, deleteRegionDanSub);
router.post(prefix + "province/create", verifyToken, createProvince);
router.put(prefix + "province/update/:id", verifyToken, updateProvince);
router.get(prefix + "province/byid/:id", verifyToken, getDataProvinceById);

//API PROVINCE & REGIONAL
router.get(prefix + "province-sub", verifyToken, getDataRegionAndProvince);
router.post(prefix + "province-sub/create", verifyToken, createRegionDanSub);
router.delete(
  prefix + "province-sub/delete:id",
  verifyToken,
  deleteRegionDanSub
);
router.put(prefix + "province-sub/update/:id", verifyToken, updateRegionDanSub);

//API ROOM

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

export default router;
