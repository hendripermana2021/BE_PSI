import db from "../models/index.js";
import { Op } from "sequelize";

const Req = db.tbl_req;
const Santri = db.tbl_santri;
const Pegawai = db.tbl_pegawai;
const Cpi = db.tbl_cpi;
const Kriteria = db.tbl_kriteria;
const Sub_Kriteria = db.tbl_subkriteria;
const Notif = db.tbl_notification;

export const getDataPermissionOnlyAccepted = async (req, res) => {
  try {
    const req = await Req.findAll({
      include: [
        {
          model: Santri,
          as: "namasantri",
        },
        {
          model: Pegawai,
          as: "created_permission",
        },
        {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
        {
          model: Pegawai,
          as: "val_go_name",
        },
        {
          model: Pegawai,
          as: "val_back_name",
        },
      ],
    });

    const result = [];
    for (let i = 0; i < req.length; i++) {
      if (req[i].permission_status != 4) result.push(req[i]);
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPermissionAll = async (req, res) => {
  const user = req.user;
  try {
    let req;
    if (user.role_id == 1 || user.role_id == 3) {
      req = await Req.findAll({
        where: {
          permission_status: { [Op.in]: [0, 1, 2] },
        },
        include: [
          {
            model: Santri,
            as: "namasantri",
          },
          {
            model: Pegawai,
            as: "created_permission",
          },
          {
            model: Cpi,
            as: "cpi_data",
            include: [
              {
                model: Kriteria,
                as: "kriteria",
              },
              {
                model: Sub_Kriteria,
                as: "subkriteria",
              },
            ],
          },
          {
            model: Pegawai,
            as: "val_go_name",
          },
          {
            model: Pegawai,
            as: "val_back_name",
          },
        ],
      });
    } else {
      req = await Req.findAll({
        where: {
          permission_status: { [Op.in]: [0, 1, 2] },
          created_by: user.id,
        },
        include: [
          {
            model: Santri,
            as: "namasantri",
          },
          {
            model: Pegawai,
            as: "created_permission",
            where: {},
          },
          {
            model: Cpi,
            as: "cpi_data",
            include: [
              {
                model: Kriteria,
                as: "kriteria",
              },
              {
                model: Sub_Kriteria,
                as: "subkriteria",
              },
            ],
          },
          {
            model: Pegawai,
            as: "val_go_name",
          },
          {
            model: Pegawai,
            as: "val_back_name",
          },
        ],
      });
    }

    if (req.length == 0) {
      res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Req not exist",
      });
    }

    const sortfill = req.sort(
      (b, a) => a.permission_status - b.permission_status
    );

    res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
      data: sortfill,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApproval = async (req, res) => {
  const user = req.user;
  try {
    let req;
    if (user.role_id == 1) {
      req = await Req.findAll({
        where: {
          permission_status: { [Op.in]: [1, 2] },
        },
        include: [
          {
            model: Santri,
            as: "namasantri",
          },
          {
            model: Pegawai,
            as: "created_permission",
          },
          {
            model: Cpi,
            as: "cpi_data",
            include: [
              {
                model: Kriteria,
                as: "kriteria",
              },
              {
                model: Sub_Kriteria,
                as: "subkriteria",
              },
            ],
          },
          {
            model: Pegawai,
            as: "val_go_name",
          },
          {
            model: Pegawai,
            as: "val_back_name",
          },
        ],
      });
    } else {
      req = await Req.findAll({
        where: {
          permission_status: { [Op.in]: [1, 2] },
        },
        include: [
          {
            model: Santri,
            as: "namasantri",
          },
          {
            model: Pegawai,
            as: "created_permission",
            where: {},
          },
          {
            model: Cpi,
            as: "cpi_data",
            include: [
              {
                model: Kriteria,
                as: "kriteria",
              },
              {
                model: Sub_Kriteria,
                as: "subkriteria",
              },
            ],
          },
          {
            model: Pegawai,
            as: "val_go_name",
          },
          {
            model: Pegawai,
            as: "val_back_name",
          },
        ],
      });
    }

    if (req.length == 0) {
      res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Req not exist",
      });
    }

    const sortfill = req.sort(
      (b, a) => a.permission_status - b.permission_status
    );

    res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
      data: sortfill,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPermissionForValidation = async (req, res) => {
  try {
    const req = await Req.findAll({
      include: [
        {
          model: Santri,
          as: "namasantri",
        },
        {
          model: Pegawai,
          as: "created_permission",
        },
        {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
        {
          model: Pegawai,
          as: "val_go_name",
        },
        {
          model: Pegawai,
          as: "val_back_name",
        },
      ],
    });

    const result = [];
    for (let i = 0; i < req.length; i++) {
      if (req[i].cpi_result > 0.5) result.push(req[i]);
    }

    if (result.length == 0) {
      res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Req not exist",
      });
    }

    const sortfill = result.sort((a, b) => b.cpi_result - a.cpi_result);

    res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission CPI Result > 50%",
      data: sortfill,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Santri,
          as: "namasantri",
        },
        {
          model: Pegawai,
          as: "created_permission",
        },
        {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
        {
          model: Pegawai,
          as: "val_go_name",
        },
        {
          model: Pegawai,
          as: "val_back_name",
        },
      ],
    });
    if (req == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Permission Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: req,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPermissionByUserId = async (req, res) => {
  const user = req.user;

  try {
    let req;
    if (user.role_id == 1) {
      req = await Req.findAll({
        where: { id_calculated: null },
        order: [["id", "DESC"]],
        include: [
          {
            model: Santri,
            as: "namasantri",
          },
          {
            model: Pegawai,
            as: "created_permission",
          },
          {
            model: Cpi,
            as: "cpi_data",

            include: [
              {
                model: Kriteria,
                as: "kriteria",
              },
              {
                model: Sub_Kriteria,
                as: "subkriteria",
              },
            ],
          },
          {
            model: Pegawai,
            as: "val_go_name",
          },
          {
            model: Pegawai,
            as: "val_back_name",
          },
        ],
      });
    } else {
      req = await Req.findAll({
        where: {
          created_by: user.userId,
          id_calculated: null,
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: Santri,
            as: "namasantri",
          },
          {
            model: Pegawai,
            as: "created_permission",
          },
          {
            model: Cpi,
            as: "cpi_data",
            include: [
              {
                model: Kriteria,
                as: "kriteria",
              },
              {
                model: Sub_Kriteria,
                as: "subkriteria",
              },
            ],
          },
          {
            model: Pegawai,
            as: "val_go_name",
          },
          {
            model: Pegawai,
            as: "val_back_name",
          },
        ],
      });
    }

    if (req == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Permission Doesn't Exist",
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Permission searched Found",
      data: req,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPermission = async (req, res) => {
  const { student_id, start_permission, end_permission, commented } = req.body;
  const cpi = req.body.kriteria;
  const alternatifKriteriaSub = req.body.kriteria;

  const user = req.user;

  try {
    //Check Request Existed
    const reqCheck = await Req.findAll({
      where: {
        student_id,
        permission_status: {
          [Op.or]: [0, 1, 2],
        },
      },
    });
    console.log(reqCheck.length);

    if (reqCheck.length > 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Permission has been created, please change santri for permission.",
      });
    }
    //END CHECK

    //MAKE REQUEST
    const req = await Req.create({
      student_id,
      created_by: user.userId,
      start_permission,
      end_permission,
      cpi_result: "",
      id_calculated: null,
      commented,
      val_go_by: "",
      val_back_by: "",
      permission_status: 0,
    });

    //END REQUEST

    //GET DATA FOR ASSOCIATED TO ANOTHER TABLE
    const santri = await Santri.findOne({
      where: { id: req.student_id },
    });

    const dataReq = await Req.findAll({
      where: { id: req.id },
    });

    const notif = await Notif.create({
      user_id: user.userId,
      message: `Permission created by ${user.name_pegawai} for ${santri.name_santri}`,
      isRead: 0,
    });
    //END

    const parsedDataProfile = JSON.parse(JSON.stringify(alternatifKriteriaSub));

    const inputCpi = cpi.map((parsedDataProfile) => ({
      id_order: req.id,
      id_kriteria: parsedDataProfile.id_kriteria,
      id_subkriteria: parsedDataProfile.id_subkriteria,
    }));

    const hasil = await Cpi.bulkCreate(inputCpi);

    res.status(200).json({
      code: 200,
      status: true,
      msg: `Permission created by ${user.name_pegawai} for ${santri.name_santri}`,
      data: { dataReq, santri, hasil },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { start_permission, end_permission, commented } = req.body;
  const reasonPermission = req.body.kriteria;

  try {
    const dataPermissionBeforeUpdate = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Santri,
          as: "namasantri",
        },
        {
          model: Pegawai,
          as: "created_permission",
        },
        {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
        {
          model: Pegawai,
          as: "val_go_name",
        },
        {
          model: Pegawai,
          as: "val_back_name",
        },
      ],
    });

    const subKriteria = await Sub_Kriteria.findAll({
      where: {
        id_kriteria: id,
      },
    });

    const dataCpi = await Cpi.findAll({
      where: { id_order: id },
    });

    if (dataPermissionBeforeUpdate == 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Kriteria doesn't exist or has been deleted!",
      });
    }

    const updatePermissionResult = await Req.update(
      { start_permission, end_permission, commented },
      {
        where: { id },
      }
    );

    for (let i = 0; i < reasonPermission.length; i++) {
      let cpiData = dataCpi.find(
        (cpi) => cpi.id_kriteria === reasonPermission[i].id_kriteria
      );
      if (!cpiData) {
        cpiData = await Cpi.create({
          id_kriteria: reasonPermission[i].id_kriteria,
          id_subkriteria: reasonPermission[i].id_subkriteria,
          id_order: id,
        });
      } else {
        await Cpi.update(
          {
            id_subkriteria: reasonPermission[i].id_subkriteria,
          },
          {
            where: { id: dataCpi[i].id },
          }
        );
      }
    }

    //BULK UPDATE WITH FOR
    // for (let i = 0; i < reasonPermission.length; i++) {
    //   if (dataCpi[i].id == null) {
    //     await Cpi.create({
    //       id_kriteria: reasonPermission[i].id_kriteria,
    //       id_subkriteria: reasonPermission[i].id_subkriteria,
    //       id_order: req.id,
    //     });
    //   }
    //   await Cpi.update(
    // {
    //   id_subkriteria: reasonPermission[i].id_subkriteria,
    // },
    // {
    //   where: { id: dataCpi[i].id },
    // }
    //   );
    // }

    const dataPermissionUpdated = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Santri,
          as: "namasantri",
        },
        {
          model: Pegawai,
          as: "created_permission",
        },
        {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
        {
          model: Pegawai,
          as: "val_go_name",
        },
        {
          model: Pegawai,
          as: "val_back_name",
        },
      ],
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Permission Success Updated",
      data: {
        "Data Sebelum": dataPermissionBeforeUpdate,
        "Sesudah Diubah": dataPermissionUpdated,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePermission = async (req, res) => {
  const { id } = req.params;

  try {
    const req = await Req.findOne({
      where: { id },
    });

    if (!req) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data permission doesn't exist or has been deleted!",
      });
    }

    await req.destroy({
      where: { id },
    });

    await Cpi.destroy({
      where: { id_order: id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Permission Successfully",
      data: req,
    });
  } catch (error) {
    console.log(error);
  }
};
