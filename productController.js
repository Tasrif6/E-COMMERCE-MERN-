





//search product
export const searchProductController = async (req,res) => {
    try {

        const {keyword} = req.params
        const result = await productModel
            .find({
                $or: [
                    {name:{$regex :keyword, $options:"i" } },
                    {description:{$regex :keyword, $options:"i" } },
                ],
            })
            .select('-photo');
        res.json(result);
    }   catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error In Search Product API',
            error 
      });
    }
};


//product filter
export const productFilterController = async (req,res) => {
    try {

        const {checked, radio} = req.body
        let args = {}
        if (checked.length) >0  argrs.category = checked
        if (radio.length) argrs.price = {$gte: radio[0], $lte:radio[1]}
        const products = await productModel.find(args)
        res.status(200).send{
        success:true,
        products,
    }   catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error In Search Product API',
            error 
      });
    }
};
