import db from "../models/index.js";

const Province = db.tbl_province;
const Region = db.tbl_region;

//KHUSUS PROVINCE

export const getDataProvince = async (req, res) => {
  try {
    const province = await Province.findAll();

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Province Program",
      data: province,
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

export const getDataProvinceById = async (req, res) => {
  const { id } = req.params;
  try {
    const province = await Province.findOne({
      where: { id },
    });

    if (!province) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "Data cant get cause deleted or something",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Get data program",
      data: province,
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

export const createProvince = async (req, res) => {
  try {
    const { name_province } = req.body;
    const createProvince = await Province.create({
      name_province,
    });

    const result = await Province.findOne({
      where: { id: createProvince.id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Created",
      data: result,
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

export const deleteProvince = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBefore = await Region.findOne({
      where: { id: id },
    });

    if (!dataBefore) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Province doesn't exist or has been deleted!",
      });
    }

    await Region.destroy({
      where: { id: dataBefore.id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Province and Region Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Delete Data Province Error" + error.message,
    });
  }
};

export const updateProvince = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_province } = req.body;

    const data_before = await Province.findOne({
      where: { id: id },
    });

    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Province doesn't exist or has been deleted!",
      });
    }

    await Province.update(
      { name_province: name_province },
      {
        where: { id: id },
      }
    );

    const data_update = await Province.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Region Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Province dan Sub-Province Error for updated" + error.message,
    });
  }
};

//KHUSUS REGION
export const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_province, name_region } = req.body;

    const data_before = await Region.findOne({
      where: { id: id },
    });

    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Region doesn't exist or has been deleted!",
      });
    }

    await Region.update(
      { name_region: name_region, id_province: id_province },
      {
        where: { id: id },
      }
    );

    const data_update = await Region.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Region Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Province dan Sub-Province Error for updated" + error.message,
    });
  }
};

export const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBefore = await Region.findOne({
      where: { id: id },
    });

    if (!dataBefore) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Province doesn't exist or has been deleted!",
      });
    }

    await Region.destroy({
      where: { id: dataBefore.id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Province and Region Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Delete Data Province Error" + error.message,
    });
  }
};

export const createRegion = async (req, res) => {
  try {
    const { name_region, id_province } = req.body;
    const createRegion = await Region.create({
      id_province,
      name_region,
    });

    const getCreateRegion = await Region.findAll({
      where: {
        id: createRegion.id,
      },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Created",
      data: getCreateRegion,
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

export const getDataRegion = async (req, res) => {
  try {
    const region = await Region.findAll({});

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Province Program",
      data: region,
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

export const getDataRegionById = async (req, res) => {
  const { id } = req.params;
  try {
    const region = await Region.findOne({
      where: { id },
    });

    if (!region) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Region doesn't exist or has been deleted!",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Get data program",
      data: region,
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

export const getDataRegionByProvince = async (req, res) => {
  const { id } = req.params;
  try {
    const region = await Region.findAll({
      where: { id_province: id },
    });

    if (!region) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Region doesn't exist or has been deleted!",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Get data program",
      data: region,
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

//DATA GABUNGAN
export const getDataRegionAndProvince = async (req, res) => {
  try {
    const province = await Province.findAll({
      include: {
        model: Region,
        as: "region",
      },
    });

    if (province.length === 0) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "No Data Province",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Province Program",
      data: province,
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

export const createRegionDanSub = async (req, res) => {
  try {
    const { name_province } = req.body;
    const subProvince = req.body.region;
    const provinceCreate = await Province.create({
      name_province,
    });

    const bulkCreateProvinceDanSub = subProvince.map((data) => ({
      id_province: provinceCreate.id,
      name_region: data.name_region,
    }));

    await Region.bulkCreate(bulkCreateProvinceDanSub);

    const updateProvince = await Province.findAll({
      include: {
        model: Region,
        as: "region",
      },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Created",
      data: updateProvince,
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

export const deleteRegionDanSub = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBefore = await Province.findOne({
      where: { id },
      include: {
        model: Region,
        as: "region",
      },
    });

    if (!dataBefore) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Province doesn't exist or has been deleted!",
      });
    }

    await Province.destroy({
      where: { id },
    });

    await Region.destroy({
      where: { id_province: dataBefore.id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Province Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Delete Data Province Error" + error.message,
    });
  }
};

export const updateRegionDanSub = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_province } = req.body;
    const fromBodySubProvince = req.body.region;

    const data_before = await Province.findOne({
      where: { id: id },
      include: {
        model: Region,
        as: "region",
      },
    });
    console.log(data_before);
    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Province doesn't exist or has been deleted!",
      });
    }

    const getDataSubProvince = await Region.findAll({
      where: {
        id_province: id,
      },
    });
    console.log(getDataSubProvince);

    //IF SCALE PRIORITY  IS SAME WITH DATA BEFORE UPDATE END

    await Province.update(
      { name_province },
      {
        where: { id },
      }
    );

    //BULK UPDATE WITH FOR
    for (let i = 0; i < fromBodySubProvince.length; i++) {
      await Region.update(
        {
          name_region: fromBodySubProvince[i].name_region,
        },
        {
          where: { id: getDataSubProvince[i].id },
        }
      );
    }

    const data_update = await Province.findOne({
      where: { id },
      include: {
        model: Region,
        as: "region",
      },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Province dan Sub-Province Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: true,
      msg: "Province dan Sub-Province Error for updated" + error.message,
    });
  }
};
