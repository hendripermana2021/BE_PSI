import db from "../models/index.js";
import { Op } from "sequelize";

const Req = db.tbl_req_ajuan;
const Users = db.tbl_users;
const Program = db.tbl_program;
const Psi = db.tbl_psi;
const Kriteria = db.tbl_kriteria;
const Sub_Kriteria = db.tbl_subkriteria;
const Notif = db.tbl_notification;
const Province = db.tbl_province;
const Region = db.tbl_region;

export const getDataAjuanPegawai = async (req, res) => {
  try {
    const user = req.user;
    const reqAjuan = await Req.findAll({
      where: {
        id_users: user.userId,
      },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
        {
          model: Program,
          as: "program",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
      data: reqAjuan,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

export const getDataAjuanOnlyAccepted = async (req, res) => {
  try {
    const req = await Req.findAll({
      // include: [
      //   {
      //     model: Users,
      //     as: "users",
      //   },
      //   {
      //     model: Program,
      //     as: "program",
      //   },
      //   {
      //     model: Province,
      //     as: "province",
      //   },
      //   {
      //     model: Region,
      //     as: "region",
      //   },
      //   {
      //     model: Psi,
      //     as: "psi_data",
      //     include: [
      //       {
      //         model: Kriteria,
      //         as: "kriteria",
      //       },
      //       {
      //         model: Sub_Kriteria,
      //         as: "subkriteria",
      //       },
      //     ],
      //   },
      // ],
    });

    if (req.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Permission Doesn't Exist",
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
      data: req,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

export const getDataAjuanById = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Program,
          as: "program",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
    });

    if (req.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Ajuan Doesn't Exist",
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

export const getDataAjuanByProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findAll({
      where: { id_program: id, req_status: false },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Program,
          as: "program",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
      order: [
        ["rank", "ASC"], // Order by cpi_result in ascending order
      ],
    });

    console.log("test yang undefined : ", id);

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

export const getDataAjuanByProgramForGenerated = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findAll({
      where: {
        id_program: id,
        req_status: true,
      },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Program,
          as: "program",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
      order: [
        ["rank", "ASC"], // Order by cpi_result in ascending order
      ],
    });

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

export const getDataAjuanByProvinceAndRegion = async (req, res) => {
  const user = req.user;

  try {
    let req;
    if (user.role_id == 1) {
      req = await Req.findAll({
        where: { id_calculated: null },
        order: [["id", "DESC"]],
        include: [
          {
            model: Users,
            as: "users",
          },
          {
            model: Program,
            as: "program",
          },
          {
            model: Province,
            as: "province",
          },
          {
            model: Region,
            as: "region",
          },
          {
            model: Psi,
            as: "psi_data",
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
        ],
      });
    } else {
      req = await Req.findAll({
        where: {
          id_users: user.userId,
          id_calculated: null,
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: Program,
            as: "program",
          },
          {
            model: Users,
            as: "users",
          },
          {
            model: Psi,
            as: "psi_data",
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
        ],
      });
    }

    if (req.length === 0) {
      return res.status(404).json({
        code: 404,
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

export const createAjuan = async (req, res) => {
  const { id_program, commented, id_users, id_province, id_region } = req.body;
  const psi = req.body.kriteria;
  const user = req.user;
  try {
    //Check Request Existed
    const reqCheck = await Req.findOne({
      where: {
        id_program,
        id_users: id_users || user.userId,
        id_calculated: null,
      },
    });

    if (reqCheck) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Req Ajuan has been created, you can requested again.",
      });
    }
    //END CHECK
    let req;
    //MAKE REQUEST
    if (user.role_id === 1) {
      req = await Req.create({
        id_users,
        id_province,
        id_region,
        id_program,
        psi_result: 0,
        commented,
        jlh_dana: 0,
        req_status: true,
        id_calculated: null,
      });
    } else {
      req = await Req.create({
        id_users: user.userId,
        id_province: user.province_id,
        id_region: user.region_id,
        id_program,
        psi_result: 0,
        commented,
        jlh_dana: 0,
        req_status: true,
        id_calculated: null,
      });
    }

    //END REQUEST

    //GET DATA FOR ASSOCIATED TO ANOTHER TABLE
    const getRequest = await Req.findOne({
      where: { id_program: req.id_program },
      include: [
        {
          model: Program,
          as: "program",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
        {
          model: Users,
          as: "users",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
    });

    const dataReq = await Req.findAll({
      where: { id: req.id },
    });

    await Notif.create({
      user_id: user.userId,
      message: `Ajuan created by ${user.name} for ${getRequest.name_program}`,
      isRead: 0,
    });
    //END

    console.log(psi);

    const inputPsi = psi.map((parsedDataProfile) => ({
      id_order: req.id,
      id_kriteria: parsedDataProfile.id_kriteria,
      id_subkriteria: parsedDataProfile.id_subKriteria,
    }));

    const hasil = await Psi.bulkCreate(inputPsi);

    res.status(200).json({
      code: 200,
      status: true,
      msg: `request Ajuan created by ${user.name} for ${getRequest.name_program}`,
      data: { dataReq, getRequest, hasil },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: `Error : ${error.message}`,
    });
  }
};

export const updateAjuan = async (req, res) => {
  const { id } = req.params;
  const { id_program, commented } = req.body;
  const reasonPermission = req.body.kriteria;

  try {
    const getAjuan = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Program,
          as: "program",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
        {
          model: Users,
          as: "users",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
    });

    const subKriteria = await Sub_Kriteria.findAll({
      where: {
        id_kriteria: id,
      },
    });

    const dataPsi = await Psi.findAll({
      where: { id_order: id },
    });

    if (!getAjuan) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Kriteria doesn't exist or has been deleted!",
      });
    }

    await Req.update(
      { id_program, commented },
      {
        where: { id },
      }
    );

    for (let i = 0; i < reasonPermission.length; i++) {
      await Psi.update(
        {
          id_subkriteria: reasonPermission[i].id_subkriteria,
        },
        {
          where: { id: dataPsi[i].id },
        }
      );
    }

    const dataUpdated = await Req.findOne({
      where: { id },
      include: [
        {
          model: Program,
          as: "program",
        },
        {
          model: Users,
          as: "users",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Permission Success Updated",
      data: { getAjuan, dataUpdated },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error updating data",
    });
  }
};

export const deleteAjuan = async (req, res) => {
  const { id } = req.params;

  try {
    const req = await Req.findOne({
      where: { id },
    });

    if (!req) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data permission doesn't exist or has been deleted!",
      });
    }

    await req.destroy({
      where: { id },
    });

    await Psi.destroy({
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
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Delete Error: " + error.message,
      data: req,
    });
  }
};

// export const getAjuanApproval = async (req, res) => {
//   const user = req.user;
//   try {
//     let req;
//     if (user.role_id == 1) {
//       req = await Req.findAll({
//         where: {
//           permission_status: { [Op.in]: [1, 2] },
//         },
//         include: [
//           {
//             model: Santri,
//             as: "namasantri",
//           },
//           {
//             model: Pegawai,
//             as: "created_permission",
//           },
//           {
//             model: Cpi,
//             as: "cpi_data",
//             include: [
//               {
//                 model: Kriteria,
//                 as: "kriteria",
//               },
//               {
//                 model: Sub_Kriteria,
//                 as: "subkriteria",
//               },
//             ],
//           },
//           {
//             model: Pegawai,
//             as: "val_go_name",
//           },
//           {
//             model: Pegawai,
//             as: "val_back_name",
//           },
//         ],
//       });
//     } else {
//       req = await Req.findAll({
//         where: {
//           permission_status: { [Op.in]: [1, 2] },
//         },
//         include: [
//           {
//             model: Santri,
//             as: "namasantri",
//           },
//           {
//             model: Pegawai,
//             as: "created_permission",
//             where: {},
//           },
//           {
//             model: Cpi,
//             as: "cpi_data",
//             include: [
//               {
//                 model: Kriteria,
//                 as: "kriteria",
//               },
//               {
//                 model: Sub_Kriteria,
//                 as: "subkriteria",
//               },
//             ],
//           },
//           {
//             model: Pegawai,
//             as: "val_go_name",
//           },
//           {
//             model: Pegawai,
//             as: "val_back_name",
//           },
//         ],
//       });
//     }

//     if (req.length == 0) {
//       res.status(400).json({
//         code: 404,
//         status: false,
//         msg: "Data Req not exist",
//       });
//     }

//     const sortfill = req.sort(
//       (b, a) => a.permission_status - b.permission_status
//     );

//     res.status(200).json({
//       code: 200,
//       status: true,
//       msg: "All Data Permission",
//       data: sortfill,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getDataAjuanAll = async (req, res) => {
//   const user = req.user;
//   try {
//     let req;
//     if (user.role_id == 1 || user.role_id == 3) {
//       req = await Req.findAll({
//         where: {
//           permission_status: { [Op.in]: [0, 1, 2] },
//         },
//         include: [
//           {
//             model: Santri,
//             as: "namasantri",
//           },
//           {
//             model: Pegawai,
//             as: "created_permission",
//           },
//           {
//             model: Cpi,
//             as: "cpi_data",
//             include: [
//               {
//                 model: Kriteria,
//                 as: "kriteria",
//               },
//               {
//                 model: Sub_Kriteria,
//                 as: "subkriteria",
//               },
//             ],
//           },
//           {
//             model: Pegawai,
//             as: "val_go_name",
//           },
//           {
//             model: Pegawai,
//             as: "val_back_name",
//           },
//         ],
//       });
//     } else {
//       req = await Req.findAll({
//         where: {
//           permission_status: { [Op.in]: [0, 1, 2] },
//           created_by: user.id,
//         },
//         include: [
//           {
//             model: Santri,
//             as: "namasantri",
//           },
//           {
//             model: Pegawai,
//             as: "created_permission",
//             where: {},
//           },
//           {
//             model: Cpi,
//             as: "cpi_data",
//             include: [
//               {
//                 model: Kriteria,
//                 as: "kriteria",
//               },
//               {
//                 model: Sub_Kriteria,
//                 as: "subkriteria",
//               },
//             ],
//           },
//           {
//             model: Pegawai,
//             as: "val_go_name",
//           },
//           {
//             model: Pegawai,
//             as: "val_back_name",
//           },
//         ],
//       });
//     }

//     if (req.length == 0) {
//       res.status(400).json({
//         code: 404,
//         status: false,
//         msg: "Data Req not exist",
//       });
//     }

//     const sortfill = req.sort(
//       (b, a) => a.permission_status - b.permission_status
//     );

//     res.status(200).json({
//       code: 200,
//       status: true,
//       msg: "All Data Permission",
//       data: sortfill,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getDataPermissionForValidation = async (req, res) => {
//   try {
//     const req = await Req.findAll({
//       include: [
//         {
//           model: Santri,
//           as: "namasantri",
//         },
//         {
//           model: Pegawai,
//           as: "created_permission",
//         },
//         {
//           model: Cpi,
//           as: "cpi_data",
//           include: [
//             {
//               model: Kriteria,
//               as: "kriteria",
//             },
//             {
//               model: Sub_Kriteria,
//               as: "subkriteria",
//             },
//           ],
//         },
//         {
//           model: Pegawai,
//           as: "val_go_name",
//         },
//         {
//           model: Pegawai,
//           as: "val_back_name",
//         },
//       ],
//     });

//     const result = [];
//     for (let i = 0; i < req.length; i++) {
//       if (req[i].cpi_result > 0.5) result.push(req[i]);
//     }

//     if (result.length == 0) {
//       res.status(400).json({
//         code: 404,
//         status: false,
//         msg: "Data Req not exist",
//       });
//     }

//     const sortfill = result.sort((a, b) => b.cpi_result - a.cpi_result);

//     res.status(200).json({
//       code: 200,
//       status: true,
//       msg: "All Data Permission CPI Result > 50%",
//       data: sortfill,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
