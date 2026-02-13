import Task from "../models/Task.js";
import Organisation from "../models/Organisation.js";

export const createTask = async (req,res) =>{
    try{
        const {title,description,organisationId,dueDate} = req.body;

        if (!title || !organisationId){
            return res.status(400).json({
                message: "title and organisationId are required",
            });
        }
        const organisation = await Organisation.findById(organisationId);

        if(!organisation){
            return res.status(404).json({message:"organisation not found"});
        }

        const task = await Task.create({
        title,
        description,
        dueDate,
        organisation: organisationId,
        createdBy: req.user._id,
        });

        res.status(201).json({
            message: "task created successfully",
            task,
        });
    }catch(error){
        console.error("create task error:",error);
        res.status(500).json({message:error.message});

    }
};

export const getOrganisationTasks = async (req, res) => {
  try {
    const { organisationId } = req.params;

    console.log("ORG ID:", organisationId); // keep this temporarily

    const tasks = await Task.find({
      organisation: organisationId, // lowercase organisation
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch tasks error:", error);
    res.status(500).json({ message: error.message });
  }
};
