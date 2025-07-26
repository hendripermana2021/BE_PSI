import db from "../models/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Users = db.tbl_users;
const Role = db.tbl_role;
const Province = db.tbl_province;
const Region = db.tbl_region;

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

    const user = await Users.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!user) {
      return res.status(401).json({
        code: 401,
        status: false,
        msg: "User not found",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        const { role_id, name, email } = user;
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
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error message" + error.message,
    });
  }
};

export const whoAmI = async (req, res) => {
  try {
    const currentUser = req.user;
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "This data Users Login Now",
      data: currentUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Data Error: " + error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Email not found",
      });
    }

    const match = await bcryptjs.compare(req.body.password, user.password);

    if (!match) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Incorrect password",
      });
    }

    const { id, name, sex, role_id, email } = user;

    const accessToken = jwt.sign(
      { id, name, sex, email, role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id, name, sex, email, role_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      { refreshtoken: refreshToken, accesstoken: accessToken },
      { where: { id } } // Use id directly without indexing
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "Lax",
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Login successful",
      data: accessToken,
    });
  } catch (error) {
    console.error("System failure:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "System failure",
    });
  }
};

export const getEmailUsers = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Email not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Error: " + error.message,
    });
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

    const user = await Users.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "User not found",
      });
    }

    const userId = user.id;

    await Users.update(
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

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const checkData = await Users.findOne({
      where: { id },
    });

    if (!checkData) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Users Account doesn't exist or has been deleted!",
      });
    }

    await Users.destroy({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Users Successfully",
      data: checkData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: false, msg: "Error : " + error.message });
  }
};

export const RegisterUsers = async (req, res) => {
  const { name, sex, email, password, role_id, region_id, province_id } =
    req.body;

  const salt = await bcryptjs.genSalt();
  const hashPassword = await bcryptjs.hash(password, salt);
  try {
    const user = await Users.create({
      name,
      sex,
      email,
      password: hashPassword,
      real_password: password,
      role_id,
      region_id,
      province_id,
    });
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Data Users berhasil",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error registering " + error.message,
    });
  }
};

export const getDataUsersQueryRoleandRegion = async (req, res) => {
  try {
    const role = req.query.role;
    const regionId = req.query.regionId;
    console.log("=========>>>>> REGION ID", regionId)
    const user = await Users.findAll({
      where: {
        role_id: role || [1, 2, 3],
        region_id: regionId,
      },
      include: [
        {
          model: Role,
          as: "role",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
      ],
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "This Data All Users",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error registering " + error.message,
    });
  }
};

export const getDataUsers = async (req, res) => {
  try {
    const user = await Users.findAll({
      include: [
        {
          model: Role,
          as: "role",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
      ],
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "This Data All Users",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error registering " + error.message,
    });
  }
};

export const getDataUsersId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error searching for user" + error.message,
    });
  }
};

export const updateDataUsers = async (req, res) => {
  const { id } = req.params;
  const { name, sex, email, password, role_id, region_id, province_id } =
    req.body;

  try {
    const data_before = await Users.findOne({
      where: { id },
    });

    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Users doesn't exist or has been deleted!",
      });
    }

    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, salt);

    await Users.update(
      {
        name,
        sex,
        email,
        password: hashPassword,
        real_password: password,
        role_id,
        region_id,
        province_id,
      },
      {
        where: { id },
      }
    );

    const data_update = await Users.findOne({
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
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error updating user" + error.message,
    });
  }
};

export const getDataUsersBy = async (req, res) => {
  try {
    const { search } = req.params;
    let user = await Users.findAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Users Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data user you searched Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error get data user" + error.message,
    });
  }
};
