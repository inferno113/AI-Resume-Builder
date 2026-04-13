import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";


//controller for creating new resume
//POST : /api/resumes/create

export const createResume= async(req ,res)=>{
    try{

        const userId=req.userId;

        //create new resume
        const {title}=req.body;

        const newResume= await Resume.create({userId,title});
        //return successful response with new resume data
        return res.status(201).json({message:"Resume created successfully",resume:newResume});


    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}

//controller for deleting new resume
//DELETE : /api/resumes/delete

export const deleteResume= async(req ,res)=>{
    try{

        const userId=req.userId;
        const resumeId=req.params.id;
        //delete resume
        await Resume.findOneAndDelete({userId, _id:resumeId});
        //return successful response with new resume data
        return res.status(200).json({message:"Resume deleted successfully"});


    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}


//get user resumes by user id
//GET : /api/resumes/get

export const getResumeById= async(req ,res)=>{
    try{

        const userId=req.userId;
        const resumeId=req.params.id;

        const resume= await Resume.findOne({userId, _id:resumeId});

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }

        //return successful response with new resume data

        resume.__v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;


        return res.status(200).json({resume});  
       


    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}


//get resume by id public 
//GET : /api/resumes/public

export const getPublicResumeById= async(req ,res)=>{
    try{

        const {resumeId}=req.params;
        const resume= await Resume.findOne({public:true, _id:resumeId});

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }

        //return successful response with new resume data


        return res.status(200).json({resume});

    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}


//controller for updating resume
//PUT : /api/resumes/update

export const updateResume= async(req ,res)=>{
    try{

        const userId=req.userId;
        const {resumeId, resumeData,removeBackground}=req.body;

        //using multer middleware to get image file from request
        const image=req.file;

        //update resume
        let resumeDataCopy=JSON.parse(resumeData);


        if(image){

            const imageBufferData=fs.createReadStream(image.path);

            const response = await imagekit.upload({
                file:imageBufferData,
                fileName:'resume.png',
                folder: 'user-resumes',
                transformation:{
                    pre: 'w-300,h-300,fo-face,z-0.75'+ (removeBackground ? ',e-bgremove' : '')
                }



            })

            resumeDataCopy.personal_info.image=response.url;
        }

        const resume=await Resume.findOneAndUpdate({userId, _id:resumeId}, {new: true});

        return res.status(200).json({message:"Resume updated successfully",resume});
        

    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}

