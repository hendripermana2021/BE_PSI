import db from "../models/index.js";

const Users = db.tbl_users;
const Kriteria = db.tbl_kriteria;
const Notif = db.tbl_notification;
const Program = db.tbl_program;
const Province = db.tbl_province;
const Region = db.tbl_region;
const Req = db.tbl_req_ajuan;
const Role = db.tbl_role;

export const dashboard = async (req, res) => {
  try {
    const currentUser = req.user;
    const user_id = req.user.userId;
    if (currentUser.role_id == 1) {
      const user = (await Users.findAll()).length;
      const total_programs = (await Program.findAll()).length;
      const province = (await Province.findAll()).length;
      const region = (await Region.findAll()).length;
      const ajuan = (await Req.findAll()).length;
      const ajuanApprove = (
        await Req.findAll({
          where: {
            req_status: false,
          },
        })
      ).length;
      const totalRole = (await Role.findAll()).length;
      const programs = await Program.findAll({
        include: { model: Req, as: "ajuan_program" },
      });
      const kriteria = (await Kriteria.findAll()).length;
      const notif = await Notif.findAll();

      const totalDanaAjuanApprove = await Req.findAll({
        where: {
          req_status: false,
        },
      });

      let total_dana_approve = 0;
      for (let i = 0; i < totalDanaAjuanApprove.length; i++) {
        total_dana_approve += totalDanaAjuanApprove[i].jlh_dana;
      }

      let total_dana = 0;
      for (let i = 0; i < programs.length; i++) {
        total_dana += programs[i].total_dana_alokasi;
      }

      const percentageAjuanWithApprove = (
        (total_dana_approve / total_dana) *
        100
      ).toFixed(2);

      const sortfill_notif = notif.sort((b, a) => a.id - b.id);

      res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard for Admin",
        data: {
          currentUser,
          programs,
          total_programs,
          province,
          region,
          ajuan,
          ajuanApprove,
          kriteria,
          user,
          sortfill_notif,
          totalRole,
          total_dana,
          total_dana_approve,
          percentage: percentageAjuanWithApprove,
        },
      });
    } else if (currentUser.role_id == 2) {
      const total_ajuan_programs = await Req.findAll({
        where: { id_user: user_id },
      });

      for (let i = 0; i < total_ajuan_programs.length; i++) {
        total_dana += total_ajuan_programs[i].jlh_dana;
      }

      const notif = await Notif.findAll({ where: { id_user: user_id } });
      const sortfill_notif = notif.sort((b, a) => a.id - b.id);

      res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard for Regional Administration",
        data: {
          currentUser,
          total_ajuan_programs,
          total_dana,
          sortfill_notif,
        },
      });
    } else {
      res.status(200).json({
        code: 200,
        status: true,
        msg: "Role Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal Server Error",
    });
  }
};
