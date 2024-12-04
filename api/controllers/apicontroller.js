import Transcation from '../models/transcationmodel.js';

export const test=async(req,res)=>
{
    res.json("hello this is transcation");
};

export const create=async (req, res) => {
    const { name,datetime, description ,price} = req.body;
    const transaction = new Transcation({ name, datetime, description ,price});
    transaction.save();
    res.json(req.body);
};

export const getAllUser = async (req, res) => {
    try {
        const result = await Transcation.find(); 
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};


export const getOne=async (req,res)=>
    {
        const id=req.params.id;
        const result= await Transcation.findById(id)
       .then((result) => {res.json(result);})
       .catch((err) => {console.log(err);})
            
    };

export const editUser= async (req, res) => {
        const id = req.params.id;
        try {
          const result = await Transcation.findByIdAndUpdate(id, req.body, { new: true } );
          if (!result) {
            return res.status(404).json({ error: "Transaction not found" });
          }
          res.json(result);
        } catch (err) {
          console.error("Error updating transaction:", err);
          res.status(500).json({ error: "Internal server error" });
        }
      };
      
    
export const deleteOne= async (req, res) => {
        const id = req.params.id;
        try {
          const result = await Transcation.findByIdAndDelete(id);
          if (!result) {
            return res.status(404).json({ error: "Transaction not found" });
          }
          res.json({ message: "Transaction deleted successfully" });
        } catch (err) {
          console.error("Error deleting transaction:", err);
          res.status(500).json({ error: "Internal server error" });
        }
      };
      


