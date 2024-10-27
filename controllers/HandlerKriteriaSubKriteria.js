import db from "../models/index.js";

const Kriteria = db.tbl_kriteria;
const SubKriteria = db.tbl_subkriteria;
export const getDataKriteria = async (req, res) => {
  try {
    const kriteria = await Kriteria.findAll({
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataKriteriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const kriteria = await Kriteria.findAll({
      where: { id: id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });
    if (kriteria == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Kriteria Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createKriteriaDanSub = async (req, res) => {
  const { scale_priority, name_kriteria, weight_score, type } = req.body;
  const subKriteria = req.body.subkriteria;

  try {
    const existingKriteria = await Kriteria.findOne({
      where: { scale_priority: scale_priority },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    if (existingKriteria) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Scale Priority is Duplicate, please change",
      });
    }

    const kriteriaCreate = await Kriteria.create({
      scale_priority,
      name_kriteria,
      weight_score,
      type,
    });

    const bulkCreateKriteriaDanSub = subKriteria.map((data) => ({
      id_kriteria: kriteriaCreate.id,
      name_sub: data.name_sub,
      value: data.value,
    }));

    const addSubKriteria = await SubKriteria.bulkCreate(
      bulkCreateKriteriaDanSub
    );

    // //Auto ROC for Kriteria
    // const kriteria = await Kriteria.findAll({});
    // const sortfill = kriteria.sort(
    //   (a, b) => a.scale_priority - b.scale_priority
    // );

    // let result = [];
    // for (let i = 1; i <= sortfill.length; i++) {
    //   for (let j = 1; j <= sortfill.length; j++) {
    //     if (i <= j) {
    //       result.push(1 / j);
    //     } else {
    //       result.push(0);
    //     }
    //   }
    //   result;
    // }

    // const separatedArray = [];
    // for (let i = 0; i < result.length; i += 6) {
    //   separatedArray.push(result.slice(i, i + 6));
    // }

    // // Menjumlahkan setiap subarray dan membagi hasilnya dengan 6
    // const sumAndAverage = separatedArray.map(
    //   (subarray) => subarray.reduce((acc, num) => acc + num, 0) / 6
    // );
    // ///////////////////////////////////////////////////////////////////////////////---> END CODE METHOD ROC

    // for (let i = 0; i < sortfill.length; i++) {
    //   await Kriteria.update(
    //     {
    //       weight_score: sumAndAverage[i],
    //     },
    //     {
    //       where: { id: sortfill[i].id },
    //     }
    //   );
    // }

    const updateKriteria = await Kriteria.findAll({});
    //END

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Create Data Kriteria and Sub Kriteria berhasil",
      data: { updateKriteria, addSubKriteria },
    });
  } catch (error) {
    console.log(error);
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
      msg: "Delete Data Role Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateKriteriaDanSub = async (req, res) => {
  const { id } = req.params;
  const { scale_priority, name_kriteria, type } = req.body;
  const fromBodySubKriteria = req.body.subkriteria;

  try {
    const getAllData = await Kriteria.findOne({ where: { scale_priority } });

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

    if (data_before == 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Kriteria doesn't exist or has been deleted!",
      });
    }

    //IF SCALE PRIORITY  IS SAME WITH DATA BEFORE UPDATE

    if (getAllData != 0) {
      await Kriteria.update(
        {
          scale_priority: data_before.scale_priority,
          weight_score: data_before.weight_score,
        },

        {
          where: { id: getAllData.id },
        }
      );

      await Kriteria.update(
        {
          scale_priority: getAllData.scale_priority,
          name_kriteria,
          type,
          weight_score: getAllData.weight_score,
        },
        {
          where: { id },
        }
      );

      for (let i = 0; i < fromBodySubKriteria.length; i++) {
        await SubKriteria.update(
          {
            name_sub: fromBodySubKriteria[i].name_sub,
            value: fromBodySubKriteria[i].value,
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

      console.log("Jalan baru");

      return res.status(200).json({
        code: 200,
        status: true,
        msg: "Kriteria dan Sub-Kriteria Success Updated",
        data: { data_before, data_update },
      });
    }

    //IF SCALE PRIORITY  IS SAME WITH DATA BEFORE UPDATE END

    const kriteria = await Kriteria.update(
      { scale_priority, name_kriteria, type },
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

    console.log("Jalan Lama");

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Kriteria dan Sub-Kriteria Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
  }
};
