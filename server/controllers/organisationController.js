import Organisation from "../models/Organisation.js";

export const createOrganisation = async (req,res) =>{
    try{
        const{name} = req.body;

        if (!name){
            return res.status(400).json({message:"Organisation name required"});
        }

        const organisation = await Organisation.create({
            name,
            createdBy: req.user._id,
            members: [req.user._id],
        });

        res.status(201).json({
            message: "Organisation created",
            organisation,

        });
    }catch(error){
        console.error("Create organisation error:",error);
        res.status(500).json({message:error.message});
    }
};