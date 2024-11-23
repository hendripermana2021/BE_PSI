import db from "../models/index.js";

const Req = db.tbl_req_ajuan;
const Program = db.tbl_program;

export const generateReport = async (req, res) => {
  try {
    const report = await Program.findAll({
      where: { id_program: req.params.id },
      include: {
        model: Req,
        as: "program",
        where: {
          status_req: false,
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
