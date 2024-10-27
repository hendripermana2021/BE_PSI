///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
//------> STEP 1

export function step1PSINormalisasi(data) {
  let normalisasi = [];
  //Step 1 normalisasi Tabel dan Flatten
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].cpi_data.length; j++) {
      normalisasi.push(data[i].cpi_data[j].subkriteria.value);
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

  return resultResuffle;
}

export function step2PenentuanNilaiPreferensi(data) {
  
}

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

console.log("Perubahan ke Matriks Nilai Preference ", groupedValuePreference);

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

// let sumPenentuanBobot = resultBobotValue;

// let sumHasil = sumPenentuanBobot.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   0
// );

// let ceiled = Math.ceil(sumHasil);

// console.log("Hasil Kriteria : ", ceiled);

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

// let sumPenentuanBobot = resultBobotValue;

// let sumHasil = sumPenentuanBobot.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   0
// );

// let ceiled = Math.ceil(sumHasil);

// console.log("Hasil Kriteria : ", ceiled);
