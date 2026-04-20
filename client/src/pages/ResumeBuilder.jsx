import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";


const ResumeBuilder =()=>{

  const {resumeId}= useParams();

  const {token}=useSelector((state)=>state.auth);



  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    skills: [],
    project: [],
    template:"classic",
    accent_color: "#3B82F6",
    public:false, 

  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);



  const sections = [
    {id: "personal", name: "Personal Info", icon:User},
    {id: "summary", name: "Summary", icon:FileText},
    {id: "experience", name: "Experience", icon: Briefcase},
    {id: "education", name: "Education", icon:GraduationCap},
    {id: "projects", name: "Projects", icon:FolderIcon},
    {id: "skills", name: "Skills", icon:Sparkles},
  ]

  const activeSection = sections[activeSectionIndex];

  useEffect(()=>{
    let isMounted = true;

    const loadExistingResume = async () => {
      try{
        const {data}= await api.get('/api/resumes/get/'+ resumeId,{
          headers:{
            Authorization: token
          }
        })

        if(isMounted && data.resume){
          setResumeData(data.resume);
          document.title = data.resume.title;
        }
      }
      catch(error){
        console.log(error.message);
      }
    };

    if(token){
      loadExistingResume();
    }

    return ()=>{
      isMounted = false;
    };
  },[resumeId, token])

  //function to toggle resume visibility
  const changeResumeVisibility = async()=>{
    //for dummy data
    // setResumeData({...resumeData,public: !resumeData.public});

    //for real data
    try{

      const formdata = new FormData();
      formdata.append('resumeId', resumeData._id);
      formdata.append("resumeData", JSON.stringify({public: !resumeData.public}));

      const {data}= await api.put('/api/resumes/update/', formdata,{headers:{
        Authorization: token
      }})

      setResumeData({...resumeData, public: !resumeData.public});
      toast.success(data.message);

    }
    catch(error){

      console.log(error.message);

    }

  }

  //function to handle resume shareing

  const handlShare =()=>{

    const resumeUrl = `${window.location.origin}/view/${resumeId}`;

    if(navigator.share){
      navigator.share({url: resumeUrl, title: resumeData.title}).catch(()=>{});
      return;
    }

    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(resumeUrl);
      toast.success("Public link copied to clipboard");
      return;
    }

    window.prompt("Copy this public resume link:", resumeUrl);

  }


  const downloadResume =()=>{
    window.print();
  }

  //function to handle resume update when user click on save changes button

  const saveResume = async()=>{

    try{

      let updatedResumeData = structuredClone(resumeData);

      //remove image from updatedResumeData before sending to backend if removeBackground is true

      if(typeof resumeData.personal_info.image==='object'){
        delete updatedResumeData.personal_info.image;
      }

      const formdata = new FormData();
      formdata.append('resumeId', resumeId);
      formdata.append('resumeData', JSON.stringify(updatedResumeData));
      removeBackground && formdata.append('removeBackground', 'yes');

      typeof resumeData.personal_info.image === 'object' && formdata.append('image', resumeData.personal_info.image);

      const {data} = await api.put('/api/resumes/update', formdata, {
        headers:{
          Authorization: token
        }
      })

      setResumeData(data.resume) 


    }
    catch(error){
      throw new Error(error?.response?.data?.message || error.message || 'Failed to save resume');
    }

  }

  

  return(
    <div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={'/app'} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
          <ArrowLeftIcon className="size-4"/> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* leftpanel of the form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

              {/* progress bar using activeSectionIndex and sections.length */}

              <hr  className="absolute top-0 left-0 right-0 border-2 border-gray-200"/>

              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{ width: `${(activeSectionIndex * 100) / (sections.length - 1)}%` }}
              />

              {/* sectio navigationn  */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">

              {/* the navigation for template selct and color */}
                <div className="flex items-center gap-2">
                  
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=>setResumeData(prev=>({...prev, template}))}/>

                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev=>({...prev, accent_color:color}))}/>

                </div>




                <div className="flex items-center">
                  {activeSectionIndex!==0  && <button  onClick={()=>setActiveSectionIndex((prevIndex)=>Math.max(prevIndex-1, 0))}  className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition" disabled={activeSectionIndex===0}>
                      <ChevronLeft  className="size-4"/>
                      Previous
                    </button>}

                  <button  onClick={()=>setActiveSectionIndex((prevIndex)=>Math.min(prevIndex+1, sections.length - 1))}  className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex===sections.length-1 && `opacity-50 cursor-not-allowed`}`} disabled={activeSectionIndex===sections.length-1}>
                      <ChevronRight  className="size-4"/>
                      Next
                    </button> 
                </div>

              </div>

              {/* form for fillling the data */}

              <div className="space-y-6">
                { activeSection.id === "personal" && (
                  <div className="space-y-4">
                    {/* seperate component for personal info form */}
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev=>({...prev,personal_info:data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>

                    

                  </div>
                )}
                {/* adding professional summary here */}
                { activeSection.id === "summary" && (

                  <ProfessionalSummary data={resumeData.professional_summary} onChange={(summary)=>setResumeData(prev=>({...prev, professional_summary: summary}))} setResumeData={setResumeData}/>

                )}

                {/* experience form */}
                { activeSection.id === "experience" && (

                  <ExperienceForm data={resumeData.experience} onChange={(experience)=>setResumeData(prev=>({...prev, experience}))} setResumeData={setResumeData}/>  
                )}

                {/* education form */}

                { activeSection.id === "education" && (
                  <EducationForm data={resumeData.education} onChange={(education)=>setResumeData(prev=>({...prev, education}))} setResumeData={setResumeData}/>
                )}

                {/* project form */}
                { activeSection.id === "projects" && (
                  <ProjectForm data={resumeData.project || []} onChange={(project)=>setResumeData(prev=>({...prev, project}))} setResumeData={setResumeData}/>
                )}

                {/* skills form */}
                { activeSection.id === "skills" && (
                  <SkillsForm data={resumeData.skills || []} onChange={(skills)=>setResumeData(prev=>({...prev, skills}))} setResumeData={setResumeData}/>

                )}

              </div>

              {/* button for savin the resume */}
              <button onClick={()=>{toast.promise(saveResume(),{loading: 'Saving...', success: 'Changes saved successfully'})}} className="bg-gradient-to-br from-green-100 to-green-200 ring-green-200 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm">
                Save Changes
              </button>

            </div>


          </div>

          {/* right panel of the form */}

          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              {/* buttons */}
              <div className="absolute bottom-3 left-0 right-0 flex  items-center justify-end gap-2">

                { resumeData.public && (

                  <button onClick={handlShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-200 to blue-400 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
                    <Share2Icon className="size-4"/>
                    Share
                  </button>

                )}
                <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors">
                  {resumeData.public ? (
                    <EyeIcon className="size-4"/>
                  ):(
                    <EyeOffIcon className="size-4"/>
                  )}

                  {resumeData.public ? 
                    'Public'
                  :'Private'}
                </button>

                <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors">
                    <DownloadIcon className="size-4"/>
                    Download
                </button>

              </div>

            </div>

            {/* ---resume preview section--- */}
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="mx-auto mt-6"/>

                
          </div>


        </div>

      </div>


        

    </div>
  )
}

export default ResumeBuilder