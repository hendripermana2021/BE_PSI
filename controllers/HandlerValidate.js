import db from "../models/index.js";
const Req = db.tbl_req;
const Santri = db.tbl_santri;
const Pegawai = db.tbl_pegawai;
const Notif = db.tbl_notification;

export const validationGo = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const req = await Req.findOne({
      where: { id, permission_status: 1 },
    });

    if (!req) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    const updateCode = await Req.update(
      { permission_status: 2, val_go_by: user.userId },
      {
        where: { id },
      }
    );

    const reqUpdate = await Req.findOne({
      where: { id },
    });

    const updateStatusSantri = await Santri.update(
      { status: 0 },
      {
        where: { id: reqUpdate.student_id },
      }
    );

    const notif = await Notif.create({
      user_id: user.userId,
      message: `Permission validation by ${user.name_pegawai} noted in ${reqUpdate.createdAt}`,
      isRead: 0,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: notif.message,
      data: reqUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const validationBack = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const req = await Req.findOne({
      where: { id, permission_status: 2 },
    });

    if (!req) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    await Req.update(
      { permission_status: 4, val_back_by: user.userId },
      {
        where: { id },
      }
    );

    const reqUpdate = await Req.findOne({
      where: { id },
    });

    const santri = await Santri.findOne({
      where: { id: reqUpdate.student_id },
    });

    await Santri.update(
      { status: 1 },
      {
        where: { id: reqUpdate.student_id },
      }
    );

    const notif = await Notif.create({
      user_id: user.userId,
      message: `Santri A.N. ${santri.name_santri} has go back and validation by ${user.name_pegawai} noted in ${reqUpdate.createdAt}`,
      isRead: 0,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: notif.message,
      data: reqUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};
