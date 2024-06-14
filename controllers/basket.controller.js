export const getBasket = async (req, res) => {
  const { userID } = req.params;
  try {
    res.status(200).json({
      message: "GET Basket",
    });
  } catch (error) {
    console.log(error, "GET Basket");
  }
};

export const postBasket = async (req, res) => {
  const { userID } = req.params;
  try {
    res.status(200).json({
      message: "POST Basket",
    });
  } catch (error) {
    console.log(error, "POST Basket");
  }
};

export const deleteBasket = async (req, res) => {
  const { userID } = req.params;
  try {
    res.status(200).json({
      message: "DELETE Basket",
    });
  } catch (error) {
    console.log(error, "DELETE Basket");
  }
};
