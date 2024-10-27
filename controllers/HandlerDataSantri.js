import db from "../models/index.js";
import { Op } from "sequelize";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import prefix from "../routes/index.js";

const Santri = db.tbl_santri;
const Room = db.tbl_room;
const Pegawai = db.tbl_pegawai;
const storage = multer.memoryStorage();

export const getDataSantri = async (req, res) => {
  try {
    const user = req.user;
    let santri;

    if (user.role_id == 1) {
      santri = await Santri.findAll({
        include: {
          model: Room,
          as: "nameroom",
          include: {
            model: Pegawai,
            as: "walikamar",
          },
        },
      });
    } else {
      santri = await Santri.findAll({
        include: {
          model: Room,
          as: "nameroom",
          where: { id_ustadz: user.userId },
          include: {
            model: Pegawai,
            as: "walikamar",
          },
        },
      });
    }

    if (santri == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    const sortfill = santri.sort((a, b) =>
      a.name_santri.localeCompare(b.name_santri)
    );

    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: sortfill,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataSantriById = async (req, res) => {
  const { id } = req.params;
  try {
    const santri = await Santri.findAll({
      where: { id: id },
    });
    if (santri == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: santri,
    });
  } catch (error) {
    console.log(error);
  }
};

export const RegisterSantri = async (req, res) => {
  const { name_santri, sex, fathername, mothername, id_room } = req.body;

  try {
    const santri = await Santri.create({
      name_santri,
      sex,
      fathername,
      mothername,
      status: 1,
      id_room,
      image: `http://localhost:8000/image/${req.file.filename}`,
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Data Santri Successfully",
      data: santri,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSantri = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Santri.findOne({
    where: { id },
  });

  let baseUrl = "http://localhost:8000";

  let relativeUrl = dataBefore.image.replace(baseUrl, "public");
  console.log(relativeUrl);

  if (dataBefore.image) {
    await fs.unlink(relativeUrl);
  }
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Data Santri doesn't exist or has been deleted!",
    });
  }

  await Santri.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Santri Successfully",
    data: dataBefore,
  });
};

export const updateDataSantri = async (req, res) => {
  const { id } = req.params;
  const { name_santri, sex, fathername, mothername, password, id_room } =
    req.body;

  try {
    const data_before = await Santri.findOne({
      where: { id },
    });

    let baseUrl = "http://localhost:8000";

    let relativeUrl = data_before.image.replace(baseUrl, "public");
    console.log(relativeUrl);

    if (data_before.image) {
      await fs.unlink(relativeUrl);
    }

    if (data_before == null) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Santri doesn't exist or has been deleted!",
      });
    }

    const santri = await Santri.update(
      {
        name_santri,
        sex,
        fathername,
        mothername,
        password,
        id_room,
        image: `http://localhost:8000/image/${req.file.filename}` || null,
      },
      {
        where: { id },
      }
    );

    const data_update = await Santri.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Santri Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
  }
};

export const imageAppeared = async (req, res) => {
  try {
    const imageName = req.params;
    const imagePath = path.join(__dirname, "../image", imageName);

    // Send the image as a response
    return res.status(200).sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
};
