import db from "../models/index.js";

const Pegawai = db.tbl_pegawai;
const Santri = db.tbl_santri;
const Kriteria = db.tbl_kriteria;
const Room = db.tbl_room;
const Notif = db.tbl_notification;

export const dashboard = async (req, res) => {
  try {
    const currentUser = req.user;
    const user_id = req.user.userId;
    if (currentUser.role_id == 1) {
      const santri = (await Santri.findAll()).length;
      const pegawai = (await Pegawai.findAll()).length;
      const kriteria = (await Kriteria.findAll()).length;
      const room = (await Room.findAll()).length;
      const notif = await Notif.findAll();
      const santriNonActive = (
        await Santri.findAll({ where: { status: false } })
      ).length;
      const santriActive = (await Santri.findAll({ where: { status: true } }))
        .length;

      const sortfill_notif = notif.sort((b, a) => a.id - b.id);

      res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard for Admin",
        data: {
          currentUser,
          santri,
          pegawai,
          kriteria,
          room,
          santriNonActive,
          santriActive,
          sortfill_notif,
        },
      });
    } else if (currentUser.role_id == 2) {
      const rooms = await Room.findAll({
        where: { id_ustadz: currentUser.userId },
      });

      if (rooms.length === 0) {
        return res.status(404).json({
          code: 404,
          status: false,
          msg: "Ustadz has no assigned rooms",
        });
      }

      const room = rooms[0]; // Assuming an Ustadz has only one room. Adjust as needed.

      const santri = (
        await Santri.findAll({
          where: { id_room: room.id },
          include: {
            model: Room,
            as: "nameroom",
            where: { id_ustadz: user_id },
            include: {
              model: Pegawai,
              as: "walikamar",
            },
          },
        })
      ).length;

      const pegawai = (await Pegawai.findAll({ where: { role_id: "3" } }))
        .length;
      const santriNonActive = (
        await Santri.findAll({
          where: { id_room: room.id, status: false },
          include: {
            model: Room,
            as: "nameroom",
            where: { id_ustadz: user_id },
            include: {
              model: Pegawai,
              as: "walikamar",
            },
          },
        })
      ).length;
      const santriActive = (
        await Santri.findAll({
          where: { id_room: room.id, status: true },
          include: {
            model: Room,
            as: "nameroom",
            where: { id_ustadz: user_id },
            include: {
              model: Pegawai,
              as: "walikamar",
            },
          },
        })
      ).length;

      res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard For Ustadz/ah",
        data: {
          currentUser,
          santri,
          pegawai,
          room,
          santriNonActive,
          santriActive,
        },
      });
    } else if (currentUser.role_id == 3) {
      const santri = (await Santri.findAll()).length;
      const pegawai = (await Pegawai.findAll()).length;

      const santriNonActive = (
        await Santri.findAll({ where: { status: false } })
      ).length;

      const santriActive = (await Santri.findAll({ where: { status: true } }))
        .length;

      res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard Kemaanan/ Satpam",
        data: { santri, pegawai, santriActive, santriNonActive },
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
