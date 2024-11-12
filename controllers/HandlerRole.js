import db from "../models/index.js";
import { Op } from "sequelize";

const Role = db.tbl_role;
export const getDataRole = async (req, res) => {
  try {
    const role = await Role.findAll({});
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "data Not Found" + error.message,
    });
  }
};

export const getDataRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({
      where: { id },
    });
    if (!role) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Role Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "data Not Found" + error.message,
    });
  }
};

export const getRoleBy = async (req, res) => {
  try {
    const { search } = req.params;
    let role = await Role.findAll({
      where: {
        [Op.or]: [{ role_name: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (!role) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Role Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data Role you searched Found",
      data: role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "data Not Found" + error.message,
    });
  }
};

export const createRole = async (req, res) => {
  const { role_name } = req.body;

  try {
    const checkRole = Role.findOne({
      where: {
        role_name: role_name,
      },
    });

    if (!checkRole) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data role has been existed!",
      });
    }

    const role = await Role.create({
      role_name,
    });

    return res.status(201).json({
      code: 201,
      status: true,
      msg: "Create Data Role berhasil",
      data: role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Error Create Data " + error.message,
    });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBefore = await Role.findOne({
      where: { id },
    });

    if (!dataBefore) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Role doesn't exist or has been deleted!",
      });
    }

    await Role.destroy({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Role Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Error Delete Data " + error.message,
    });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Role Name is required",
      });
    }

    const dataBefore = await Role.findOne({
      where: { id: id },
    });

    if (!dataBefore) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Role doesn't exist or has been deleted!",
      });
    }

    await Role.update(
      { role_name },
      {
        where: { id: id },
      }
    );

    const dataUpdate = await Role.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Role Success Updated",
      data_before: { dataBefore, dataUpdate },
    });
  } catch (error) {
    console.log(error);
  }
};
