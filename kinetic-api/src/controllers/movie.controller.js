
const createMovie = async (req, res) => {
  try {


  }
  catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error creating movie", status: 'fail' })
  }
}

export { createMovie };

