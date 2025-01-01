import { assignRanking } from "../function/myFunction.js";
import db from "../models/index.js";

const Req = db.tbl_req_ajuan;
const Kriteria = db.tbl_kriteria;
const Sub_Kriteria = db.tbl_subkriteria;
const Psi = db.tbl_psi;
const Program = db.tbl_program;
const Users = db.tbl_users;
const Province = db.tbl_province;
const Region = db.tbl_region;
const Program_Kriteria = db.tbl_program_kriteria;
const Calculated = db.tbl_calculated;

export const CalculatedROCForArrangeMoney = async (req, res) => {
  try {
    const { programId } = req.params;
    const requestAjuan = await Req.findAll({
      where: { id_program: programId },
      order: [["rank", "ASC"]], // Order by rank in Ascending order
    });

    // GET data find by program
    const getDana = await Program.findOne({ where: { id: programId } }); // Await to get the data

    // Initialize variables
    const resultBobotRank = [];
    const resultRank = [];

    // Loop to populate the result arrays for rank and corresponding weights
    for (let i = 0; i < requestAjuan.length; i++) {
      if (requestAjuan[i].rank === 1) {
        resultBobotRank.push(requestAjuan[i].rank);
      } else {
        resultBobotRank.push(1 / requestAjuan[i].rank); // Assign weight to each rank
      }
      resultRank.push(requestAjuan[i].rank); // Store ranks
    }

    // Remove duplicates from the ranks and weights
    const reduceRank = [...new Set(resultRank)];
    const reduceRankBobot = [...new Set(resultBobotRank)];

    console.log("Unique Ranks:", reduceRank);
    console.log("Unique Rank Weights:", reduceRankBobot);

    const rankByPeople = [];

    for (let i = 0; i < reduceRank.length; i++) {
      let countPeople = 0; // Initialize countPeople to 0 for each rank
      for (let j = 0; j < requestAjuan.length; j++) {
        if (reduceRank[i] === requestAjuan[j].rank) {
          countPeople++;
        }
      }
      rankByPeople.push(countPeople);
    }

    console.log("Jumlah Orang Tiap Rank", rankByPeople);

    // Initialize summary result
    let resultSummary = 0;

    for (let i = 0; i < reduceRank.length; i++) {
      let totalPeople = 0;

      // Count the number of people with this rank
      for (let j = 0; j < requestAjuan.length; j++) {
        if (requestAjuan[j].rank === reduceRank[i]) {
          totalPeople++;
          `${totalPeople}`;
        }
      }

      // Calculate the weight for this rank and accumulate the total summary
      let wadahResult = reduceRankBobot[i] * totalPeople;
      resultSummary += wadahResult;
    }

    console.log("Total Rank Weight:", resultSummary);

    // Arrange Money
    const arrangeMoneyForEveryRank = [];

    for (let i = 0; i < reduceRankBobot.length; i++) {
      arrangeMoneyForEveryRank.push(
        (reduceRankBobot[i] / resultSummary) * getDana.total_dana_alokasi
      );
    }

    console.log("Arrange Money for Every Rank:", arrangeMoneyForEveryRank);

    //ARRANGE MONEY TO OBJECT

    let resultArrangeMoney = [];
    for (let i = 0; i < reduceRank.length; i++) {
      for (let j = 0; j < requestAjuan.length; j++) {
        if (reduceRank[i] === requestAjuan[j].rank) {
          requestAjuan[j].money = arrangeMoneyForEveryRank[i];
          resultArrangeMoney.push(requestAjuan[j]);
        }
      }
    }

    // console.log("Request Ajuan dengan uang", resultArrangeMoney);
    console.log(
      "Jumlah Arrange Money for Every Rank",
      resultArrangeMoney.length
    );

    const id_calculated = await Calculated.create({
      createdBy: req.user.userId,
    });

    for (let i = 0; i < requestAjuan.length; i++) {
      await Req.update(
        {
          jlh_dana: resultArrangeMoney[i].money,
          req_status: false,
          id_calculated: id_calculated.id,
        },
        {
          where: { id: resultArrangeMoney[i].id },
        }
      );
    }

    const reqAjuanNew = await Req.findAll({
      where: { id_program: programId },
      order: [["rank", "ASC"]], // Order by rank in Ascending order
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Calculated ROC",
      data: {
        program: getDana,
        totalRank: reduceRank,
        bobotRank: reduceRankBobot,
        totalRankByPeople: rankByPeople,
        totalRankWeight: resultSummary,
        moneyForEveryRank: arrangeMoneyForEveryRank,
        resultAjuan: reqAjuanNew,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const calculatedPSIisNull = async (_req, res) => {
  try {
    const { programId } = _req.params;
    console.log("Params", programId);
    const req = await Req.findAll({
      where: {
        id_program: programId,
      },
      include: [
        {
          model: Users,
          as: "users",
        },
        {
          model: Program,
          as: "program",
        },
        {
          model: Province,
          as: "province",
        },
        {
          model: Region,
          as: "region",
        },
        {
          model: Psi,
          as: "psi_data",
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
      ],
    });

    if (req.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Request Ajuan Not Found",
      });
    }

    const kriteria = await Program_Kriteria.findAll({
      where: {
        id_program: programId,
      },
      include: [
        {
          model: Program,
          as: "program",
        },
        {
          model: Kriteria,
          as: "kriteria",
        },
      ],
    });

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].psi_data.length; j++) {
        normalisasi.push(req[i].psi_data[j].subkriteria.value);
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
      const result = kriteria[i].kriteria.type;
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
      await Program_Kriteria.update(
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
          psi_result: rowSums[i],
        },
        {
          where: { id: req[i].id },
        }
      );
    }

    const getReq = await Req.findAll({
      where: {
        id_program: programId,
      },
      order: [
        ["psi_result", "DESC"], // Order by cpi_result in ascending order
      ],
    });

    const getRank = assignRanking(getReq);

    for (let i = 0; i < getReq.length; i++) {
      await Req.update(
        {
          rank: getRank[i].rank,
        },
        {
          where: { id: getRank[i].id },
        }
      );
    }

    const getReq1 = await Req.findAll({
      where: {
        id_program: programId,
      },
      order: [
        ["psi_result", "DESC"], // Order by cpi_result in ascending order
      ],
    });

    console.log("id", getRank[0].id);
    console.log("users", getRank[0].id_users);
    console.log("rank", getRank[0].rank);

    res.status(200).json({
      status: true,
      msg: "Success Calculated CPI",
      data: {
        nilai: resultResuffle,
        minMax: valuesMaxMin,
        statusKriteria: getProfitAndCost,
        normalisasi: groupedArraysNormalisasi,
        SumNormalisasi: columnSums,
        SumNormalisasiArray: adjustValue,
        MatriksPreference: groupedValuePreference,
        SumDeviasi: columnDeviasi,
        SumBobotKr: bobotAdjust,
        TotalBobotKr: sum,
        SumBobotKriteria: resultBobotValue,
        resultMatriks: resultFindResultArray,
        resultRows: rowSums,
        result: getReq1,
        ajuan: req,
        kriteria,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
