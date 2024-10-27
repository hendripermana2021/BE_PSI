import db from "../models/index.js";

const Req = db.tbl_req;
const Santri = db.tbl_santri;

export const generateReport = async (req, res) => {
  try {
    const report = await Santri.findAll({
      include: {
        model: Req,
        as: "cpi",
        where: {
          status_req: true,
        },
      },
    });

    const result = report.sort((a, b) => b.cpi.cpi_result - a.cpi.cpi_result);

    const total = result.length;

    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: { result, total },
    });
  } catch (error) {
    console.log(error);
  }
};
