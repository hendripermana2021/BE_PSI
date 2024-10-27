import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Pegawai = db.tbl_pegawai;
const Role = db.tbl_role;

export const handleGetRoot = async (req, res) => {
  res.status(200).json({
    code: 200,
    status: "OK",
    msg: "E-Permission Status Activated",
  });
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const pegawai = await Pegawai.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!pegawai) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        const { role_id, name, email } = pegawai;
        const accessToken = jwt.sign(
          { userId: role_id, name, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const whoAmI = async (req, res) => {
  try {
    const currentUser = req.user;
    res.status(200).json({
      code: 200,
      status: true,
      msg: "This data Users Login Now",
      data: currentUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Pegawai.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Email not found",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Incorrect password",
      });
    }

    const { id, name_pegawai, sex, role_id, email } = user;

    const accessToken = jwt.sign(
      { id, name_pegawai, sex, email, role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id, name_pegawai, sex, email, role_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Pegawai.update(
      { refreshtoken: refreshToken, accesstoken: accessToken },
      { where: { id } } // Use id directly without indexing
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "Lax",
    });

    res.status(200).json({
      code: 200,
      msg: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.error("System failure:", error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "System failure",
    });
  }
};

export const getEmailPegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.findOne({
      where: {
        email: req.body.email,
      },
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({
        code: 200,
        status: false,
        msg: "User has been logged out",
      });
    }

    const user = await Pegawai.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!user) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "User not found",
      });
    }

    const userId = user.id;

    await Pegawai.update(
      { refreshtoken: null },
      {
        where: {
          id: userId,
        },
      }
    );

    res.clearCookie("refreshToken");

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "You have been logged out",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal Server Error",
    });
  }
};

export const deletePegawai = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Pegawai.findOne({
    where: { id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Users Account doesn't exist or has been deleted!",
    });
  }

  await Pegawai.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Pegawai Successfully",
    data: dataBefore,
  });
};

export const RegisterPegawai = async (req, res) => {
  const { name_pegawai, sex, email, password, role_id } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const pegawai_new = await Pegawai.create({
      name_pegawai,
      sex,
      email,
      password: hashPassword,
      real_password: password,
      role_id,
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Data Pegawai berhasil",
      data: pegawai_new,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.findAll({
      include: {
        model: Role,
        as: "role",
      },
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "This Data All Pegawai",
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPegawaiId = async (req, res) => {
  const { id } = req.params;
  try {
    const pegawai = await Pegawai.findAll({
      where: { id: id },
    });
    if (pegawai == "") {
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
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDataPegawai = async (req, res) => {
  const { id } = req.params;
  const { name_pegawai, sex, email, password, role_id } = req.body;

  try {
    const data_before = await Pegawai.findOne({
      where: { id },
    });

    if (data_before == null) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Users doesn't exist or has been deleted!",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await Pegawai.update(
      {
        name_pegawai,
        sex,
        email,
        password: hashPassword,
        real_password: password,
        role_id,
      },
      {
        where: { id },
      }
    );

    const data_update = await Pegawai.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Users Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPegawaiBy = async (req, res) => {
  try {
    const { search } = req.params;
    let pegawai = await Pegawai.findAll({
      where: {
        [Op.or]: [{ name_pegawai: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (pegawai == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Pegawai Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data pegawai you searched Found",
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};
