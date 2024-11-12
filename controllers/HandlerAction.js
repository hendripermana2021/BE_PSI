import db from "../models/index.js";

const Req = db.tbl_req;
const Cpi = db.tbl_cpi;
const Kriteria = db.tbl_kriteria;
const Santri = db.tbl_santri;
const Sub_Kriteria = db.tbl_subkriteria;
const Calculated = db.tbl_calculated;

export const CalculatedROC = async (req, res) => {
  const kriteria = await Kriteria.findAll({
    include: {
      model: Sub_Kriteria,
      as: "sub_kriteria",
    },
  });

  ///////////////////////////////////////////////////////////////////////////////---> START CODE FOR METHOD ROC
  try {
    const sortfill = kriteria.sort(
      (a, b) => a.scale_priority - b.scale_priority
    );

    let result = [];
    for (let i = 1; i <= sortfill.length; i++) {
      for (let j = 1; j <= sortfill.length; j++) {
        if (i <= j) {
          result.push(1 / j);
        } else {
          result.push(0);
        }
      }
      result;
    }

    const separatedArray = [];
    for (let i = 0; i < result.length; i += 6) {
      separatedArray.push(result.slice(i, i + 6));
    }

    // Menjumlahkan setiap subarray dan membagi hasilnya dengan 6
    const sumAndAverage = separatedArray.map(
      (subarray) => subarray.reduce((acc, num) => acc + num, 0) / 6
    );
    ///////////////////////////////////////////////////////////////////////////////---> END CODE METHOD ROC

    for (let i = 0; i < sortfill.length; i++) {
      await Kriteria.update(
        {
          weight_score: sumAndAverage[i],
        },
        {
          where: { id: sortfill[i].id },
        }
      );
    }

    const updateKriteria = await Kriteria.findAll({
      include: {
        model: Sub_Kriteria,
        as: "sub_kriteria",
      },
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Calculated ROC",
      data: updateKriteria,
    });
  } catch (error) {
    console.log(error);
  }
};

export const calculatedCPIisNull = async (req, res) => {
  const user = req.user;
  try {
    let req;
    if (user.role_id == 1) {
      req = await Req.findAll({
        where: {
          id_calculated: null,
        },
        include: {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
      });
    } else {
      req = await Req.findAll({
        where: {
          id_calculated: null,
          created_by: user.userId,
        },
        include: {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
      });
    }

    const checkKriteria = await Kriteria.findAll({
      where: { weight_score: 0 },
    });

    if (checkKriteria.length > 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Please Process ROC Kriteria First",
      });
    }

    if (req.length === 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Nothing Data CPI Empty for Calculated",
      });
    }

    const kriteria = await Kriteria.findAll({});

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        normalisasi.push(req[i].cpi_data[j].subkriteria.value);
      }
    }

    //flatten
    const groupSize = normalisasi.length / req.length;

    // Mengelompokkan array menjadi subarray berukuran 6
    const groupedArrays = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = normalisasi.slice(i, i + groupSize);
      groupedArrays.push(subarray);
    }
    console.log("getvalue : ", normalisasi);
    console.log("Grouped by Alternatif : ", groupedArrays);

    console.log("normalisasi lenght : ", normalisasi.length);
    console.log("groupsized lenght : ", req.length);

    //pencarian MIN :
    const transposedArray = groupedArrays[0].map((_, colIndex) =>
      groupedArrays.map((row) => row[colIndex])
    );
    console.log("Transposed Array : ", transposedArray);

    const minValues = transposedArray.map((row) => Math.min(...row));
    console.log("Pencarian Nilai Min : ", minValues);
    //END

    //------> STEP KE-2, melakukan perkalian dan pembagian
    let minNormalisasi = [];

    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        if (req[i].cpi_data[j].kriteria.type == 1) {
          let a = (groupedArrays[i][j] / minValues[j]) * 100;
          minNormalisasi.push(a);
        } else {
          let a = (minValues[j] / groupedArrays[i][j]) * 100;
          minNormalisasi.push(a);
        }
      }
    }
    const minNormalisasiTranspose = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = minNormalisasi.slice(i, i + groupSize);
      minNormalisasiTranspose.push(subarray);
    }
    console.log("Hasil Step 2 :", minNormalisasi);
    console.log("Transpose Step 2 :", minNormalisasiTranspose);
    //END

    //------> STEP KE-3, BOBOT x MATRIKS TERNORMALISASI
    let step3 = [];

    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        let b = minNormalisasiTranspose[i][j] * kriteria[j].weight_score;
        step3.push(b);
      }
    }

    const step3Transpose = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = step3.slice(i, i + groupSize);
      step3Transpose.push(subarray);
    }

    const sumGroups = step3Transpose.map((group) =>
      group.reduce((acc, value) => acc + value, 0)
    );

    console.log("Hasil Step 3 :", step3);
    console.log("Transpose Step 3 :", step3Transpose);
    console.log("Sum Array Step 3 :", sumGroups);

    // Find maximum value
    const maxValue = Math.max(...sumGroups);

    // Find minimum value
    const minValue = Math.min(...sumGroups);
    console.log(`Max Value: ${maxValue}
    Min Value: ${minValue}`);
    //END

    //------> STEP 4 FINAL RESULTS
    let step4Final = [];
    for (let i = 0; i < sumGroups.length; i++) {
      let z = (sumGroups[i] - minValue) / (maxValue - minValue);
      step4Final.push(z);
    }
    console.log("Final Results CPI dan ROC : ", step4Final);

    ///////////////////////////////////////////////////////////////////////////////---> END CODE METHOD CPI

    //Insert CPI RESULTS to DATABASE Permission Req Table Database

    const calculateId = await Calculated.create({
      created_by: user.userId,
    });

    for (let i = 0; i < req.length; i++) {
      await Req.update(
        {
          cpi_result: step4Final[i],
          id_calculated: calculateId.id,
        },
        {
          where: { id: req[i].id },
        }
      );
    }

    console.log(step4Final[0]);

    const resultCpi = await Req.findAll({
      include: [
        {
          model: Cpi,
          as: "cpi_data",
          include: [
            {
              model: Kriteria,
              as: "kriteria",
            },
            {
              model: Sub_Kriteria,
              as: "subkriteria",
            },
          ],
        },
        {
          model: Santri,
          as: "namasantri",
        },
      ],
    });

    const sortfill = resultCpi.sort((b, a) => a.cpi_result - b.cpi_result);

    for (let i = 0; i < resultCpi.length; i++) {
      let newStatus = resultCpi[i].cpi_result > 0.5 ? 1 : 4;

      await Req.update(
        {
          permission_status: newStatus,
        },
        {
          where: { id: resultCpi[i].id },
        }
      );
    }

    res.status(200).json({
      status: true,
      msg: "Success Calculated CPI",
      data: {
        sortfill,
        step1: { groupedArrays, minValues },
        step2: minNormalisasiTranspose,
        step3: { step3Transpose, sumGroups, maxValue, minValue },
        step4: step4Final,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const calculatedPSIisNull = async (req, res) => {
  try {
    let req = await Req.findAll({
      where: {
        id_calculated: null,
      },
      include: {
        model: Cpi,
        as: "cpi_data",
        include: [
          {
            model: Kriteria,
            as: "kriteria",
          },
          {
            model: Sub_Kriteria,
            as: "subkriteria",
          },
        ],
      },
    });

    const kriteria = await Kriteria.findAll();

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        normalisasi.push(req[i].cpi_data[j].subkriteria.value);
      }
    }

    console.log("Normalisasi : ", normalisasi);

    //flatten
    const groupSize = normalisasi.length / req.length;

    // Mengelompokkan array menjadi subarray berukuran 6
    const groupedArrays = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = normalisasi.slice(i, i + groupSize);
      groupedArrays.push(subarray);
    }

    console.log(
      "Perubahan ke Matriks dari Sub Kriteria yang diambil ",
      groupedArrays
    );

    let array = groupedArrays;

    let resultResuffle = [];

    for (let i = 0; i < array.length; i++) {
      let reshuffledRow = []; // Temp variable for the current reshuffled row
      for (let j = 0; j < array[i].length; j++) {
        // Menggunakan indeks j untuk mendapatkan nilai dari baris yang benar
        const resultNum = array[i][array[i].length - 1 - j]; // Mengambil elemen dari akhir ke depan
        reshuffledRow.push(resultNum); // Menambahkan nilai ke reshuffledRow
      }
      resultResuffle.push(reshuffledRow); // Menambahkan reshuffledRow ke hasil akhir
    }

    console.log("Reshuffle Array: ", resultResuffle);

    const transposedArray = resultResuffle[0].map((_, colIndex) =>
      resultResuffle.map((row) => row[colIndex])
    );

    console.log("Transposed Array : ", transposedArray);
    // console.log(kriteria)
    //END

    let getProfitAndCost = [];
    for (let i = 0; i < kriteria.length; i++) {
      const result = kriteria[i].type;
      getProfitAndCost.push(result);
    }

    console.log("data cost and benefit", getProfitAndCost);

    let valuesMaxMin = [];

    for (let i = 0; i < transposedArray.length; i++) {
      if (getProfitAndCost[i]) {
        // Cari nilai maksimum dari setiap kolom
        const maxValue = Math.max(...transposedArray[i]);
        valuesMaxMin.push(maxValue);
      } else {
        // Cari nilai minimum dari setiap kolom
        const minValue = Math.min(...transposedArray[i]);
        valuesMaxMin.push(minValue);
      }
    }

    console.log("Pencarian Hasilnya : ", valuesMaxMin);

    //
    let arrayGet = resultResuffle; // Pastikan transposedArray sudah didefinisikan sebelumnya
    let tampunganArray = [];
    // let normalisasiArray = [];

    for (let i = 0; i < arrayGet.length; i++) {
      for (let j = 0; j < arrayGet[i].length; j++) {
        if (getProfitAndCost[j]) {
          let value = arrayGet[i][j] / valuesMaxMin[j];
          tampunganArray.push(value);
        } else {
          let value = valuesMaxMin[j] / arrayGet[i][j];
          tampunganArray.push(value);
        }
      }
      // normalisasiArray.push(tampunganArray);
    }
    console.log("Normalized Array: ", tampunganArray);

    const groupedArraysNormalisasi = [];
    for (let i = 0; i < tampunganArray.length; i += groupSize) {
      const subarray = tampunganArray.slice(i, i + groupSize);
      groupedArraysNormalisasi.push(subarray);
    }

    console.log("Perubahan ke Matriks ", groupedArraysNormalisasi);

    let data = groupedArraysNormalisasi;

    let columnSums = Array(data[0].length).fill(0); // Array untuk menyimpan hasil penjumlahan tiap kolom

    // Iterasi melalui baris
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        columnSums[j] += data[i][j]; // Menambahkan nilai dari tiap kolom
      }
    }

    // Output hasil penjumlahan tiap kolom
    console.log("Sum Normalisasi Array", columnSums);

    let arrayValue = columnSums;
    let adjustValue = [];

    for (let i = 0; i < arrayValue.length; i++) {
      let result = (1 / req.length) * arrayValue[i];
      adjustValue.push(result);
    }

    console.log("Adjusted Array: ", adjustValue);

    let arrayPreference = groupedArraysNormalisasi;
    let resultArrayPreference = [];

    for (let i = 0; i < arrayPreference.length; i++) {
      for (let j = 0; j < arrayPreference[i].length; j++) {
        let result =
          (arrayPreference[i][j] - adjustValue[j]) *
          (arrayPreference[i][j] - adjustValue[j]);
        resultArrayPreference.push(result);
      }
    }

    console.log("Result Array Preference: ", resultArrayPreference);

    const groupedValuePreference = [];
    for (let i = 0; i < resultArrayPreference.length; i += groupSize) {
      const subarray = resultArrayPreference.slice(i, i + groupSize);
      groupedValuePreference.push(subarray);
    }

    console.log(
      "Perubahan ke Matriks Nilai Preference ",
      groupedValuePreference
    );

    let dataDeviasi = groupedValuePreference;

    let columnDeviasi = Array(dataDeviasi[0].length).fill(0); // Array untuk menyimpan hasil penjumlahan tiap kolom

    // Iterasi melalui baris
    for (let i = 0; i < dataDeviasi.length; i++) {
      for (let j = 0; j < dataDeviasi[i].length; j++) {
        columnDeviasi[j] += dataDeviasi[i][j]; // Menambahkan nilai dari tiap kolom
      }
    }

    // Output hasil penjumlahan tiap kolom
    console.log("Hasil Devisi Nilai Preference : ", columnDeviasi);

    let bobotAdjust = [];

    for (let i = 0; i < columnDeviasi.length; i++) {
      const result = 1 - columnDeviasi[i];
      bobotAdjust.push(result);
    }

    console.log("Hasil Bobot Kr PSI :", bobotAdjust);

    let sumBobotValue = bobotAdjust;

    let sum = sumBobotValue.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    console.log("Total Bobot Value:", sum);

    let arrayBobotAdjust = bobotAdjust;
    let resultBobotValue = [];

    for (let i = 0; i < arrayBobotAdjust.length; i++) {
      const result = arrayBobotAdjust[i] / sum;
      resultBobotValue.push(result);
    }

    console.log("Hasil Penentuan Bobot Kriteria : ", resultBobotValue);

    for (let i = 0; i < kriteria.length; i++) {
      await Kriteria.update(
        {
          weight_score: resultBobotValue[i],
        },
        {
          where: { id: kriteria[i].id },
        }
      );
    }

    let bowlArrayNormalizedMatrix = groupedArraysNormalisasi;

    let findResultArray = [];

    for (let i = 0; i < bowlArrayNormalizedMatrix.length; i++) {
      for (let j = 0; j < bowlArrayNormalizedMatrix[i].length; j++) {
        let result = bowlArrayNormalizedMatrix[i][j] * resultBobotValue[j];
        findResultArray.push(result);
      }
    }

    console.log("Hasil Penentuan PSI: " + findResultArray);

    const resultFindResultArray = [];
    for (let i = 0; i < findResultArray.length; i += groupSize) {
      const subarray = findResultArray.slice(i, i + groupSize);
      resultFindResultArray.push(subarray);
    }

    console.log("Perubahan ke Matriks Hasil dari PSI ", resultFindResultArray);

    // Buat array untuk menyimpan jumlah setiap baris
    const rowSums = resultFindResultArray.map((row) =>
      row.reduce((sum, value) => sum + value, 0)
    );

    // Tampilkan hasilnya
    console.log("Jumlah setiap baris:", rowSums);

    for (let i = 0; i < req.length; i++) {
      await Req.update(
        {
          cpi_result: rowSums[i],
        },
        {
          where: { id: req[i].id },
        }
      );
    }

    const getReq = await Req.findAll({
      order: [
        ["cpi_result", "DESC"], // Order by cpi_result in ascending order
      ],
    });

    for (let i = 0; i < getReq.length; i++) {
      await Req.update(
        {
          rank: i + 1,
        },
        {
          where: { id: getReq[i].id },
        }
      );
    }

    const getReq1 = await Req.findAll({
      order: [
        ["cpi_result", "DESC"], // Order by cpi_result in ascending order
      ],
    });

    res.status(200).json({
      status: true,
      msg: "Success Calculated CPI",
      data: {
        getReq1,
        kriteria,
        step1: { groupedArrays },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const calculatedPSIByIdCalculated = async (req, res) => {
  const user_id = req.user.userId;
  const { id } = req.params;
  try {
    const req = await Req.findAll({
      where: {
        created_by: user_id,
        id_calculated: id,
      },
      include: {
        model: Cpi,
        as: "cpi_data",
        include: [
          {
            model: Kriteria,
            as: "kriteria",
          },
          {
            model: Sub_Kriteria,
            as: "subkriteria",
          },
        ],
      },
    });

    if (req.length === 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Nothing Data CPI Empty for Calculated",
      });
    }

    const kriteria = await Kriteria.findAll({});

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        normalisasi.push(req[i].cpi_data[j].subkriteria.value);
      }
    }

    //flatten
    const groupSize = normalisasi.length / req.length;

    // Mengelompokkan array menjadi subarray berukuran 6
    const groupedArrays = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = normalisasi.slice(i, i + groupSize);
      groupedArrays.push(subarray);
    }
    console.log("getvalue : ", normalisasi);
    console.log("Grouped by Alternatif : ", groupedArrays);

    console.log("normalisasi lenght : ", normalisasi.length);
    console.log("groupsized lenght : ", req.length);

    //pencarian MIN :
    const transposedArray = groupedArrays[0].map((_, colIndex) =>
      groupedArrays.map((row) => row[colIndex])
    );
    console.log("Transposed Array : ", transposedArray);

    const minValues = transposedArray.map((row) => Math.min(...row));
    console.log("Pencarian Nilai Min : ", minValues);
    //END

    //------> STEP KE-2, melakukan perkalian dan pembagian
    let minNormalisasi = [];

    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        if (req[i].cpi_data[j].kriteria.type == 1) {
          let a = (groupedArrays[i][j] / minValues[j]) * 100;
          minNormalisasi.push(a);
        } else {
          let a = (minValues[j] / groupedArrays[i][j]) * 100;
          minNormalisasi.push(a);
        }
      }
    }
    const minNormalisasiTranspose = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = minNormalisasi.slice(i, i + groupSize);
      minNormalisasiTranspose.push(subarray);
    }
    console.log("Hasil Step 2 :", minNormalisasi);
    console.log("Transpose Step 2 :", minNormalisasiTranspose);
    //END

    //------> STEP KE-3, BOBOT x MATRIKS TERNORMALISASI
    let step3 = [];

    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        let b = minNormalisasiTranspose[i][j] * kriteria[j].weight_score;
        step3.push(b);
      }
    }

    const step3Transpose = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = step3.slice(i, i + groupSize);
      step3Transpose.push(subarray);
    }

    const sumGroups = step3Transpose.map((group) =>
      group.reduce((acc, value) => acc + value, 0)
    );

    console.log("Hasil Step 3 :", step3);
    console.log("Transpose Step 3 :", step3Transpose);
    console.log("Sum Array Step 3 :", sumGroups);

    // Find maximum value
    const maxValue = Math.max(...sumGroups);

    // Find minimum value
    const minValue = Math.min(...sumGroups);
    console.log(`Max Value: ${maxValue}
    Min Value: ${minValue}`);
    //END

    //------> STEP 4 FINAL RESULTS
    let step4Final = [];
    for (let i = 0; i < sumGroups.length; i++) {
      let z = (sumGroups[i] - minValue) / (maxValue - minValue);
      step4Final.push(z);
    }
    console.log("Final Results CPI dan ROC : ", step4Final);

    ///////////////////////////////////////////////////////////////////////////////---> END CODE METHOD CPI

    //Insert CPI RESULTS to DATABASE Permission Req Table Database
    for (let i = 0; i < req.length; i++) {
      await Req.update(
        {
          cpi_result: step4Final[i],
        },
        {
          where: { id: req[i].id },
        }
      );
    }
    console.log(step4Final[0]);

    res.status(200).json({
      status: true,
      msg: "Success Calculated ROC",
      data: {
        req,
        step1: { groupedArrays, minValues },
        step2: minNormalisasiTranspose,
        step3: { step3Transpose, sumGroups, maxValue, minValue },
        step4: step4Final,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReqPSINull = async (req, res) => {
  const user_id = req.user.userId;

  try {
    const req = await Req.findAll({
      where: {
        created_by: user_id,
        id_calculated: 0,
      },
      include: {
        model: Cpi,
        as: "cpi_data",
        include: [
          {
            model: Kriteria,
            as: "kriteria",
          },
          {
            model: Sub_Kriteria,
            as: "subkriteria",
          },
        ],
      },
    });

    if (req.length === 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Nothing Data CPI Empty for Calculated",
      });
    }

    res.status(200).json({
      status: true,
      msg: "Success get data CPI null by created",
      data: req,
    });
  } catch (error) {}
};
