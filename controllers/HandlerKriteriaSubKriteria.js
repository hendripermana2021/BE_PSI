import { ifGetEmptyResponse, responseJson } from "../function/myFunction.js";
import db from "../models/index.js";

const Kriteria = db.tbl_kriteria;
const SubKriteria = db.tbl_subkriteria;

//KRITERIA
export const getDataKriteria = async (req, res) => {
  try {
    const kriteria = await Kriteria.findAll({});

    if (kriteria.length === 0) {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "Data Not Found or Empty",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Kriteria Program",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

export const getDataKriteriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const kriteria = await Kriteria.findOne({
      where: { id: id },
    });

    if (!kriteria) {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "Data Not Found or Empty",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Get data program",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

//SUB KRITERIA
export const getDataSubKriteriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const subkriteria = await SubKriteria.findAll({
      where: { id: id },
    });

    if (subkriteria.length === 0) {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "Data Not Found or Empty",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Get data subkriteria",
      data: subkriteria,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

export const createSubKriteria = async (req, res) => {
  try {
    const { name_sub, id_kriteria, description, value } = req.body;
    const subKriteria = await SubKriteria.create({
      name_sub,
      id_kriteria,
      description,
      value,
    });

    const updateSub = await SubKriteria.findAll();
    //END

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Created",
      data: { subKriteria, updateSub },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

export const deleteSubKriteria = async (req, res) => {
  const { id } = req.params;

  try {
    const dataBefore = await SubKriteria.findOne({
      where: { id },
    });

    if (!dataBefore) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Sub-Kriteria doesn't exist or has been deleted!",
      });
    }

    await SubKriteria.destroy({
      where: { id: dataBefore.id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Sub0Kriteria Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Delete Data Sub Kriteria Error",
    });
  }
};

export const updateSubKriteria = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_sub, id_kriteria, description, value } = req.body;

    const data_before = await SubKriteria.findOne({
      where: { id },
    });

    if (!data_before) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Sub Kriteria doesn't exist or has been deleted!",
      });
    }

    //IF SCALE PRIORITY  IS SAME WITH DATA BEFORE UPDATE END

    await SubKriteria.update(
      { name_sub, id_kriteria, description, value },
      {
        where: { id },
      }
    );

    const data_update = await SubKriteria.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Sub-Kriteria Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Sub-Kriteria Error for updated",
    });
  }
};

//GABUNGAN
export const getDataKriteriaAndSub = async (req, res) => {
  try {
    const kriteria = await Kriteria.findAll({
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    if (kriteria.length === 0) {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "Data Not Found or Empty",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Kriteria Program",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

export const getDataKriteriaAndSubById = async (req, res) => {
  try {
    const { id } = req.params;
    const kriteria = await Kriteria.findAll({
      where: { id: id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    if (kriteria.length === 0) {
      return res.status(400).json({
        code: 400,
        status: true,
        msg: "Data Not Found or Empty",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Kriteria Program",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Error: " + error.message,
    });
  }
};

export const createKriteriaDanSub = async (req, res) => {
  try {
    const { name_kriteria, type, subkriteria } = req.body;

    // Validate the input
    if (!name_kriteria || !type) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Invalid input: Please provide all required fields.",
      });
    }

    // Create the main Kriteria
    const newKriteria = await Kriteria.create({
      name_kriteria,
      weight_score: 0,
      type,
    });

    // Prepare the subKriteria data for bulk creation
    const subKriteriaData = subkriteria.map((sub) => ({
      id_kriteria: newKriteria.id,
      name_sub: sub.name_sub,
      value: sub.value,
      description: sub.description,
    }));

    // Bulk create subKriteria
    const createdSubKriteria = await SubKriteria.bulkCreate(subKriteriaData);

    // Fetch the updated list of all Kriteria (if needed)
    const allKriteria = await Kriteria.findAll();

    // Return success response
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Kriteria and SubKriteria successfully created.",
      data: {
        kriteria: newKriteria,
        subKriteria: createdSubKriteria,
        allKriteria,
      },
    });
  } catch (error) {
    console.error("Error in createKriteriaDanSub:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Server error: " + error.message,
    });
  }
};

export const deleteKriteriaDanSub = async (req, res) => {
  const { id } = req.params;

  try {
    const dataBefore = await Kriteria.findOne({
      where: { id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    if (!dataBefore) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Role doesn't exist or has been deleted!",
      });
    }

    await Kriteria.destroy({
      where: { id },
    });

    await SubKriteria.destroy({
      where: { id_kriteria: dataBefore.id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Kriteria Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Delete Data Kriteria Error",
    });
  }
};

export const updateKriteriaDanSub = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_kriteria, type } = req.body;
    const fromBodySubKriteria = req.body.subkriteria;

    const data_before = await Kriteria.findOne({
      where: { id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    const getDataSubKriteria = await SubKriteria.findAll({
      where: {
        id_kriteria: id,
      },
    });

    if (!data_before) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Kriteria doesn't exist or has been deleted!",
      });
    }

    //IF SCALE PRIORITY  IS SAME WITH DATA BEFORE UPDATE END

    await Kriteria.update(
      { name_kriteria, type },
      {
        where: { id },
      }
    );

    //BULK UPDATE WITH FOR
    for (let i = 0; i < fromBodySubKriteria.length; i++) {
      await SubKriteria.update(
        {
          name_sub: fromBodySubKriteria[i].name_sub,
          value: fromBodySubKriteria[i].value,
          description: fromBodySubKriteria[i].description,
        },
        {
          where: { id: getDataSubKriteria[i].id },
        }
      );
    }

    const data_update = await Kriteria.findOne({
      where: { id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Kriteria dan Sub-Kriteria Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Kriteria dan Sub-Kriteria Error for updated",
    });
  }
};
