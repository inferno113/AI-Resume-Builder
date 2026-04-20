import Resume from "../models/Resume.js";
import { generateJsonContent, generateTextContent } from "../services/aiService.js";

const toSafeString = (value) => (typeof value === "string" ? value.trim() : "");

const toSafeStringArray = (value) =>
    Array.isArray(value)
        ? value.map((item) => toSafeString(item)).filter(Boolean)
        : [];

const normalizeResumeData = (rawData = {}) => {
    const personalInfo = rawData.personal_info || rawData.personalInfo || {};
    const experience = Array.isArray(rawData.experience) ? rawData.experience : [];
    const project = Array.isArray(rawData.project)
        ? rawData.project
        : Array.isArray(rawData.projects)
        ? rawData.projects
        : [];
    const education = Array.isArray(rawData.education) ? rawData.education : [];

    return {
        professional_summary: toSafeString(rawData.professional_summary),
        skills: toSafeStringArray(rawData.skills),
        personal_info: {
            image: toSafeString(personalInfo.image),
            full_name: toSafeString(personalInfo.full_name),
            profession: toSafeString(personalInfo.profession),
            phone: toSafeString(personalInfo.phone),
            email: toSafeString(personalInfo.email),
            location: toSafeString(personalInfo.location),
            linkedin: toSafeString(personalInfo.linkedin),
            website: toSafeString(personalInfo.website),
        },
        experience: experience.map((item) => ({
            company: toSafeString(item?.company),
            position: toSafeString(item?.position),
            start_date: toSafeString(item?.start_date),
            end_date: toSafeString(item?.end_date),
            description: toSafeString(item?.description),
            is_current: item?.is_current === true || item?.is_current === "true",
        })),
        project: project.map((item) => ({
            name: toSafeString(item?.name),
            type: toSafeString(item?.type),
            description: toSafeString(item?.description),
        })),
        education: education.map((item) => ({
            institution: toSafeString(item?.institution),
            degree: toSafeString(item?.degree),
            field: toSafeString(item?.field),
            graduation_date: toSafeString(item?.graduation_date),
            gpa: toSafeString(item?.gpa),
        })),
    };
};

export const enhanceProfessionalSummary= async(req,res)=>{

    try{

        const {userContent}=req.body;

        if(!userContent){
            return res.status(400).json({message:"User content is required"});
        }

        const enhancedContent = await generateTextContent({
            systemPrompt:
                "You are an expert resume writer. Improve professional summaries for ATS-friendly resumes. Keep output concise, impactful, and achievement-focused.",
            userPrompt: `Enhance this professional summary:\n\n${userContent}`,
            temperature: 0.4,
        });

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

        const enhancedContent = await generateTextContent({
            systemPrompt:
                "You are an expert resume writer. Improve job descriptions with concise, measurable achievements and ATS-friendly wording.",
            userPrompt: `Enhance this job description:\n\n${userContent}`,
            temperature: 0.4,
        });

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

        const MAX_RESUME_CHARS = 18000;
        const trimmedResumeText = String(resumeText).slice(0, MAX_RESUME_CHARS);

        const systemPrompt =
            "Extract structured resume data into valid JSON only. Use empty strings for missing text fields, false for missing booleans, and empty arrays for missing lists.";

        const userPrompt = [
            "Read the resume text and return JSON with this exact shape:",
            "{",
            '  "professional_summary": "",',
            '  "skills": [""],',
            '  "personal_info": {',
            '    "image": "",',
            '    "full_name": "",',
            '    "profession": "",',
            '    "phone": "",',
            '    "email": "",',
            '    "location": "",',
            '    "linkedin": "",',
            '    "website": ""',
            "  },",
            '  "experience": [{',
            '    "company": "",',
            '    "position": "",',
            '    "start_date": "",',
            '    "end_date": "",',
            '    "description": "",',
            '    "is_current": false',
            "  }],",
            '  "project": [{',
            '    "name": "",',
            '    "type": "",',
            '    "description": ""',
            "  }],",
            '  "education": [{',
            '    "institution": "",',
            '    "degree": "",',
            '    "field": "",',
            '    "graduation_date": "",',
            '    "gpa": ""',
            "  }]",
            "}",
            "",
            "Resume text:",
            trimmedResumeText,
        ].join("\n");

        const extractedData = await generateJsonContent({
            systemPrompt,
            userPrompt,
            temperature: 0.2,
        });

        const parsedData = normalizeResumeData(extractedData);

        const newResume= await Resume.create({
            userId,
            title,
            ...parsedData
        });

        res.json({resumeId:newResume._id, message:"Resume uploaded successfully"});

    }

    catch(error){

        return res.status(500).json({message:"Failed to upload resume",error:error.message});

    }

}




