import { FilePen, FilePenIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { use } from "react";
import { dummyResumeData } from "../assets/assets";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard =()=>{
  //create colors
  const colors=["#5A9B82", "#6D96B5", "#897AB0", "#B57E91", "#BAA072", "#AC7269"]
  //loading all dummy resumes added in assets folder and setting it to the state variable allResumes using useEffect and useState hooks
  const loadAllResumes = async()=>{
    setAllResumes(dummyResumeData)
  }

  const navigate = useNavigate()

  //createresume functionwhich will be called when the user clicks on the create resume button and it will create a new resume

  const createResume = async(event)=>{
    event.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/res123`) //navigate to the resume builder page with the id of the newly created resume

  }  

  //upload resume function
  const uploadResume = async(event)=>{
    event.preventDefault()
    setShowUploadResume(false)
      navigate(`/app/builder/res123`) //navigate to the resume builder page with the id of the newly created resume


  } 

  //edit resume title function
  const editTitle = async(event)=>{
    event.preventDefault()
  }
  //delete resume function
  const deleteResume = async(resumeId)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?")
    if(confirmDelete){
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }
  

  useEffect(()=>{
    loadAllResumes();
  }, [])

  //state variables for showing create resume form and upload resume form and also for storing the title and resume data of the resume being created or edited

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')



  return(
    <div>

      <div className=" max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">


        {/* this is heading part of dashboard page */}
        <p className='text-2xl font-medium text-gray-900 mb-2 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent sm:hidden'>
          Welcome, John Doe!
        </p>

        {/* these are two buttons for creating new resume and upkoad the existing resume  */}
        <div className="flex gap-4">

          {/* create resume button with plus icon from lucide react and tailwind css with hover effect and transition */}
          <button onClick={()=>setShowCreateResume(true)} className="w-full  bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-700 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-green-500 to-green-500 text-white rounded-full text-white rounded-full"/>

            <p className="text-sm group-hover:text-green-600 transition-all duration-300">Create Resume</p>
          </button>

          
          <button  onClick={()=> setShowUploadResume(true)} className="w-full  bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-700 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-green-500 to-green-800 text-white rounded-full text-white rounded-full"/>

            <p className="text-sm group-hover:text-green-600 transition-all duration-300">Upload Resume</p>
          </button>
        </div> 
        <hr  className="border-slate-300 my-6 sm:w-[305px]"/>

{/* 
        these are the dummy resumes in the assets folder we will attach the resumes of the user to these cards so they can see on the dasboard in sepearate section */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">

          {allResumes.map((resume, index)=>{
            const baseColor= colors[index% colors.length];
            return(
              <button onClick={()=> navigate(`/app/builder/${resume._id}`)} key={index} className=' relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,borderColor: baseColor + '40'}}>

                <FilePenIcon className="size-7 group-hover:scale-105 transition-all duration-300" style={{color:baseColor}}/>

                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{color:baseColor}}>{resume.title}</p>

                <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-399 ox-2 text-center" style={{color:baseColor +'90'}}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div onClick={(e)=>e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <PencilIcon onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
                </div>

              </button>
            )
          })}
        

        </div>


          {/* this is the pop up form for creating new resume which will be shown when the user clicks on the create resume button and it will have a input field for the title of the resume and a button to create the resume and also a button to close the form */}
        {
          showCreateResume && (
            <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">

              <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
                <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder="Enter Resume Title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required/>

                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>
                <XIcon  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={()=>{setShowCreateResume(false); setTitle('')}}/>

              </div>

            </form>
          )
        }

        {
          showUploadResume && (
             <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">

              <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
                <h2 className="text-xl font-bold mb-4">Upload your Resume</h2>
                <input  onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder="Enter Resume Title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required/>

                {/* upload file input field */}
                <div>
                  <label htmlFor="resume-input" className="block text-sm text-slate-700">
                    Select your resume file
                    <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">

                      {/* checking if the resume state variable has data if it has data then show the name of the file otherwise show the upload icon and text to upload the resume */}
                      {resume ? (
                        <p className="text-green-700 text-slate-600">{resume.name}</p>
                      ):(
                        <>
                           <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-green-500 to-green-800 text-white rounded-full text-white rounded-full"/>
                          <p className="text-sm group-hover:text-green-600 transition-all duration-300">Click to upload your resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input type="file" id='resume-input' accept=".pdf" hidden onChange={(e)=> setResume(e.target.files[0])} />

                </div>

                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Upload your Resume</button>
                <XIcon  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={()=>{setShowUploadResume(false); setTitle('')}}/>

              </div>

            </form>
          )
        }

        {
          editResumeId && (
            <form onSubmit={editTitle} onClick={()=>setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">

              <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
                <h2 className="text-xl font-bold mb-4">Edit Resume</h2>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder="Enter Resume Title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required/>

                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Update</button>
                <XIcon  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={()=>{setEditResumeId(''); setTitle('')}}/>

              </div>

            </form>
          )
        }

      </div>
    </div>
  )
}

export default Dashboard