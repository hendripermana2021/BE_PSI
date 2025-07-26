import db from "../models/index.js";

const Program = db.tbl_program;
const ReqAjuan = db.tbl_req_ajuan;
const ProgramKriteria = db.tbl_program_kriteria;
const Kriteria = db.tbl_kriteria;
const SubKriteria = db.tbl_subkriteria;

export const getDataPrograms = async (req, res) => {
  try {
    // const user = req.user;
    let program;
    program = await Program.findAll({
      include: {
        model: ReqAjuan,
        as: "ajuan_program",
      },
    });

    if (program.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Program",
      data: program,
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

export const getDataProgramsWithKriteriaById = async (req, res) => {
  try {
    // const user = req.user;
    const { id } = req.params;
    let program;
    // program = await ProgramKriteria.findAll({
    //   where: {
    //     id_program: id,
    //   },
    //   include: [
    //     {
    //       model: Program,
    //       as: "program",
    //     },
    //     {
    //       model: Kriteria,
    //       as: "kriteria",
    //       include: {
    //         model: SubKriteria,
    //         as: "sub_kriteria",
    //       },
    //     },
    //   ],
    // });
    program = await Program.findAll({
      where: {
        id: id,
      },
      include: {
        model: ProgramKriteria,
        as: "programs_kriteria",
        include: {
          model: Kriteria,
          as: "kriteria",
          include: {
            model: SubKriteria,
            as: "sub_kriteria",
          },
        },
      },
    });

    if (program.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Program",
      data: program,
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

export const getDataKriteriaByPrograms = async (req, res) => {
  try {
    // const user = req.user;
    const { id } = req.params;
    let program;
    program = await Program.findAll({
      where: {
        id: id,
      },
      include: {
        model: ProgramKriteria,
        as: "programs_kriteria",
        include: {
          model: Kriteria,
          as: "kriteria",
          include: {
            model: SubKriteria,
            as: "sub_kriteria",
          },
        },
      },
    });

    if (program.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Program",
      data: program,
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

export const getDataProgramsWithKriteria = async (req, res) => {
  try {
      const program = await Program.findAll({
      include: {
        model: ProgramKriteria,
        as: "programs_kriteria",
        include: {
          model: Kriteria,
          as: "kriteria",
          include: {
            model: SubKriteria,
            as: "sub_kriteria",
          },
        },
      },
    });

    if (program.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Program",
      data: program,
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

export const deleteDataProgramsKriteria = async (req, res) => {
  try {
    const { id } = req.params;
    let program;
    program = await ProgramKriteria.findOne({
      where: {
        id: id,
      },
    });

    if (!program) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    await ProgramKriteria.destroy({ where: { id: id } });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Deleted Data",
      data: program,
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

export const createDataProgramKriteria = async (req, res) => {
  try {
    const { id_program, kriteria } = req.body;

    // Validate the input
    if (!id_program || !kriteria) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Invalid input: Please provide all required fields.",
      });
    }

    // Prepare the subKriteria data for bulk creation
    const mappingProgramKriteria = kriteria.map((kriterias) => ({
      id_program: id_program,
      id_kriteria: kriterias.id_kriteria,
    }));

    // Bulk create subKriteria
    const resultMap = await ProgramKriteria.bulkCreate(mappingProgramKriteria);

    // // Fetch the updated list of all Kriteria (if needed)
    // const program = await ProgramKriteria.findAll({
    //   where: {
    //     id_program: id_program,
    //   },
    // });

    // Return success response
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Program Kriteria Success Created",
      data: resultMap,
    });
  } catch (error) {
    console.error("Error Created Program Kriteria:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Server error: " + error.message,
    });
  }
};

export const getDataProgramsById = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await Program.findOne({
      where: { id: id },
    });

    if (program === "" || program === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Program",
      data: program,
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

export const createPrograms = async (req, res) => {
  try {
    const { name_program, total_dana_alokasi } = req.body;
    const program = await Program.create({
      name_program,
      total_dana_alokasi,
    });
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Deleted Data",
      data: program,
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

export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBefore = await Program.findOne({
      where: { id },
    });

    if (!dataBefore) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data not found",
      });
    }

    await Program.destroy({
      where: { id },
    });

    await ProgramKriteria.destroy({
      where: { id_program: id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Program",
      data: dataBefore,
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

export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_program, total_dana_alokasi } = req.body;
    const data_before = await Program.findOne({
      where: { id },
    });

    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Santri doesn't exist or has been deleted!",
      });
    }

    await Program.update(
      {
        name_program,
        total_dana_alokasi,
      },
      {
        where: { id },
      }
    );

    const data_update = await Program.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Program",
      data: { data_before, data_update },
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

// export const deleteProgram = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const dataBefore = await Program.findOne({
//       where: { id },
//     });

//     let baseUrl = process.env.ENVIRONMENT_DEV;

//     let relativeUrl = dataBefore.image.replace(baseUrl, "public");
//     console.log(relativeUrl);

//     if (dataBefore.image) {
//       await fs.unlink(relativeUrl);
//     }
//     const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

//     ifGetEmptyResponse(parsedDataProfile, "Data Tidak ditemukan");

//     await Santri.destroy({
//       where: { id },
//     });

//     return res.responseJson(
//       200,
//       parsedDataProfile,
//       true,
//       "Data success delete"
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       code: 500,
//       status: false,
//       msg: "Error: " + error.message,
//     });
//   }
// };

// export const updateProgram = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name_program, total_dana_alokasi } = req.body;
//     const data_before = await Program.findOne({
//       where: { id },
//     });

//     let baseUrl = "http://localhost:8000";

//     let relativeUrl = data_before.image.replace(baseUrl, "public");
//     console.log(relativeUrl);

//     if (data_before.image) {
//       await fs.unlink(relativeUrl);
//     }

//     if (data_before == null) {
//       return res.status(404).json({
//         code: 404,
//         status: false,
//         msg: "Data Santri doesn't exist or has been deleted!",
//       });
//     }

//     const program = await Program.update(
//       {
//         name_program,
//         total_dana_alokasi,
//         // image: `http://localhost:8000/image/${req.file.filename}` || null,
//       },
//       {
//         where: { id },
//       }
//     );

//     const data_update = await Program.findOne({
//       where: { id },
//     });

//     return res.responseJson(
//       200,
//       { data_update: data_update },
//       true,
//       "Program successfully updated"
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const imageAppeared = async (req, res) => {
//   try {
//     const imageName = req.params;
//     const imagePath = path.join(__dirname, "../image", imageName);

//     // Send the image as a response
//     return res.status(200).sendFile(imagePath);
//   } catch (error) {
//     console.log(error);
//   }
// };
