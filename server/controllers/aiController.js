import dotenv from "dotenv";
import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";


//controller for enhancing professional summary content using OpenAI API
// POST : /api/ai/generate

import { model } from "mongoose";

export const enhanceProfessionalSummary= async(req,res)=>{

    try{

        const {userContent}=req.body;

        if(!userContent){
            return res.status(400).json({message:"User content is required"});
        }

        //call OpenAI API to enhance professional summary content

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,

            messages:[
                {role:"system", content:"You are an expert resume writer. Your task is to enhance the professional summary content for a resume. You will receive the user's original content, and you need to improve it by making it more concise, impactful, and tailored for a resume. Focus on highlighting key skills, achievements, and experiences that would make the candidate stand out to potential employers.Make it compelling and suitable for a ATS friendly resume."},
                {
                    role:"user",
                    content: userContent,
                }
            ]

        })

        const enhancedContent=response.choices[0].message.content;

        return res.status(200).json({enhancedContent});

    }
    catch(error){

        return res.status(500).json({message:"Failed to enhance professional summary",error:error.message});

    }

}


//controller for enhancing job description content using OpenAI API
// POST : /api/ai/jobdescription

export const enhanceJobDescription= async(req,res)=>{

    try{

        const {userContent}=req.body;

        if(!userContent){
            return res.status(400).json({message:"User content is required"});
        }

        //call OpenAI API to enhance job description content

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,

            messages:[
                {role:"system", content:"You are an expert resume writer. Your task is to enhance the job description content for a resume. You will receive the user's original content, and you need to improve it by making it more concise, impactful, and tailored for a resume. Focus on highlighting key responsibilities, achievements, and skills that would make the candidate stand out to potential employers. Make it compelling and suitable for a ATS friendly resume."},
                {
                    role:"user",
                    content: userContent,
                }
            ]

        })

        const enhancedContent=response.choices[0].message.content;

        return res.status(200).json({enhancedContent});

    }
    catch(error){

        return res.status(500).json({message:"Failed to enhance professional summary",error:error.message});

    }

}

//controller for uploading resume to database
// POST : /api/ai/upload-resume

export const uploadResume= async(req,res)=>{

    try{

        const {resumeText, title}=req.body;
        const userId=req.userId;

        if(!resumeText || !title){
            return res.status(400).json({message:"Resume text and title are required"});
        }

        const  systemPrompt="You are an expert ai agent to extract data from resume and store it in database. You will receive the resume text and you need to extract key information such as name, contact details, professional summary, work experience, education, skills, and any other relevant sections. The extracted data should be structured in a way that can be easily stored in a database and used for generating resumes. Focus on accuracy and completeness while extracting the information from the resume text.";

        const userPrompt=`extract data from this resume: ${resumeText}
        
        Provide data in the following json format with no additional text before or after:
        
        professional_summary:{type:String, default:""},
        skills :[{type:String}],

        personal_info:{
        image:{type:String, default:""},
        full_name:{type:String, default:""},
        profession:{type:String, default:""},
        phone:{type:String, default:""},
        email:{type:String, default:""},
        location:{type:String, default:""},
        linkedin:{type:String, default:""},
        website:{type:String, default:""},

        },

        experience:[
        {
            company:{type:String, default:""},
            position:{type:String, default:""},
            start_date:{type:String, default:""},
            end_date:{type:String, default:""},
            description:{type:String, default:""},
            is_current:{type:Boolean, default:false},
        }
        ],

        project:[
        {
            name:{type:String, default:""},
            type:{type:String, default:""},
            description:{type:String, default:""},
        }
        ],

        education:[
        {
            institution:{type:String, default:""},
            degree:{type:String, default:""},
            field:{type:String, default:""},
            graduation_date:{type:String, default:""},
            gpa:{type:String, default:""},
        }

        
        `

              

        //call OpenAI API to enhance job description content

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,

            messages:[
                {
                    role:"system", 
                    content:systemPrompt
                },
                {
                    role:"user",
                    content: userPrompt,
                }
            ],

            response_format:{
                type:"json_object",
            }

        })

        const extractedData=response.choices[0].message.content;

        //store extracted data in database
        const parsedData=JSON.parse(extractedData);

        const newResume= await Resume.create({
            userId,
            title,
            ...parsedData
        });

        res.json({resumeId:newResume._id, message:"Resume uploaded successfully"});

    }

    catch(error){

        const providerMessage =
            error?.error?.message ||
            error?.response?.data?.error?.message ||
            error?.message;

        return res.status(500).json({message:"Failed to upload resume",error:providerMessage});

    }

}




