import db from "../models/index.js";
import { Op } from "sequelize";

const Room = db.tbl_room;
const Pegawai = db.tbl_pegawai;
export const getDataRoom = async (req, res) => {
  try {
    const user = req.user;
    let room;

    if (user.role_id == 1) {
      room = await Room.findAll({
        include: {
          model: Pegawai,
          as: "namaustadz",
        },
      });
    } else {
      room = await Room.findAll({
        where: { id_ustadz: user.userId },
        include: {
          model: Pegawai,
          as: "namaustadz",
        },
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Data you searched found",
      data: room,
    });
    console.log(user.role_id);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getDataRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findAll({
      where: { id: id },
      include: {
        model: Pegawai,
        as: "namaustadz",
      },
    });
    if (room == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Room Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: room,
      url: req.url,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomBy = async (req, res) => {
  try {
    const { search } = req.params;
    let room = await Room.findAll({
      where: {
        [Op.or]: [{ nameroom: { [Op.like]: `%` + search + `%` } }],
      },
      include: {
        model: Pegawai,
        as: "namaustadz",
      },
    });
    if (room == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Room Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data Room you searched Found",
      data: room,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createRoom = async (req, res) => {
  const { id_ustadz, nameroom } = req.body;

  try {
    const room = await Room.create({
      id_ustadz,
      nameroom,
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Create Room Success",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Room.findOne({
    where: { id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Data Room doesn't exist or has been deleted!",
    });
  }

  await Room.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Room Successfully",
    data: dataBefore,
  });
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const data_before = await Room.findOne({
      where: { id: id },
    });

    if (data_before == null) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Room doesn't exist or has been deleted!",
      });
    }

    const { id_ustadz, nameroom } = req.body;

    const room = await Room.update(
      {
        id_ustadz,
        nameroom,
      },
      {
        where: { id: id },
      }
    );

    const data_update = await Room.findOne({
      where: { id: id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Rooms Success Update",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
  }
};
