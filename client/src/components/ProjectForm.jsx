import { Trash2 } from "lucide-react";
import React from "react";
import { Plus } from "lucide-react";
import { dummyResumeData } from "../assets/assets";

const ProjectForm = ({data, onChange})=>{


    const addProject = ()=>{
        const newProject = {
            name: "",
            description: "",
            type: "",
        };
        onChange([...data, newProject]);
    }

    const removeProject= (index)=>{
        const updatedProject = data.filter((_,i)=>i!==index);
        onChange(updatedProject);
    }

    const updateProject = (index, field, value)=>{
        const updated= [...data];
        updated[index] = {...updated[index], [field]: value};
        onChange(updated);
    }





    return (

        <div>

        <div>

            <div className="flex items-center justify-between">

                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Projects</h3>
                    <p className="text-sm text-gray-500">Add details about your projects.</p>
                </div>
                <button onClick={addProject} className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hhover:bg-green-200 transition-colors ">
                    <Plus className="size-5"/>
                    Add Project
                </button>

            </div>
            

           
            <div className="space-y-4 mt-4">

                    { data.map((project, index)=>(
                        <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3">

                            <div className="flex justify-between items-start">
                                <h4>Project #{index+1}</h4>
                                <button onClick={()=>removeProject(index)}className="text-red-500 hover:text-red-700 transition-colors" >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className=" grid gap-3">

                                <input className="px-3 py-2 text-sm rounded-lg" type="text" placeholder="Project Name" value={project.name || ""} onChange={(e)=>updateProject(index, "name", e.target.value)} />


                                <input className="px-3 py-2 text-sm rounded-lg" type="text" placeholder="Project Type" value={project.type || ""} onChange={(e)=>updateProject(index, "type", e.target.value)} />

                                <textarea value={project.description || ""} onChange={(e)=>updateProject(index, "description",e.target.value)} type="text" className="w-full resize-none px-3 py-2 text-sm rounded-lg" placeholder="Add detailed description of your porject." rows={4} />

                             
                                
                            </div>
                            
                            
                         
                        </div>
                    ))

                    }


            </div>
            
        </div>

        </div>

    )
}

export default ProjectForm;