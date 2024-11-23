// Fungsi untuk menghitung ranking
export function assignRanking(data) {
  // Urutkan data berdasarkan psi_result dari yang tertinggi ke terendah
  const sortedData = data.sort((a, b) => b.psi_result - a.psi_result);

  // Assign ranking
  let rank = 1;
  for (let i = 0; i < sortedData.length; i++) {
    if (i > 0 && sortedData[i].psi_result === sortedData[i - 1].psi_result) {
      // Jika psi_result sama dengan sebelumnya, assign rank yang sama
      sortedData[i].rank = sortedData[i - 1].rank;
    } else {
      // Jika berbeda, assign rank baru
      sortedData[i].rank = rank;
      rank++;
    }
  }

  return sortedData;
}
