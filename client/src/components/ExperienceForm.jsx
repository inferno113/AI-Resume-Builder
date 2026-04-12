import { Briefcase, Plus, Sparkles, Trash } from "lucide-react";
import React from "react";

const ExperienceForm = ({data, onChange})=>{

    const addExperience = ()=>{
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",    
            is_current: false,
        };
        onChange([...data, newExperience]);
    }

    const removeExperience = (index)=>{
        const updatedExperience = data.filter((_,i)=>i!==index);
        onChange(updatedExperience);
    }

    const updateExperience = (index, field, value)=>{
        const updated= [...data];
        updated[index] = {...updated[index], [field]: value};
        onChange(updated);
    }




    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Experience</h3>
                    <p className="text-sm text-gray-500">Add details about your work.</p>
                </div>
                <button onClick={addExperience} className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hhover:bg-purple-200 transition-colors ">
                    <Plus className="size-5"/>
                    Add Experience
                </button>

            </div>
            

            {data.length===0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
                    <p>No professional experience added yet.</p>
                    <p>Click "Add Experience" to start building your resume.</p> 
                </div>
            ):(
                <div className="space-y-4">

                    { data.map((experience, index)=>(
                        <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-3">

                            <div className="flex justify-between items-start">
                                <h4>Experience #{index+1}</h4>
                                <button onClick={()=>removeExperience(index)}className="text-red-500 hover:text-red-700 transition-colors" >
                                    <Trash className="size-4" />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">

                                <input className="px-3 py-2 text-sm rounded-lg" type="text" placeholder="Company" value={experience.company || ""} onChange={(e)=>updateExperience(index, "company", e.target.value)} />

                                <input className="px-3 py-2 text-sm rounded-lg" type="text" placeholder="Job Title" value={experience.position || ""} onChange={(e)=>updateExperience(index, "position", e.target.value)} />

                                <input className="px-3 py-2 text-sm rounded-lg" type="month" placeholder="Start Date" value={experience.start_date || ""} onChange={(e)=>updateExperience(index, "start_date", e.target.value)} />

                                <input  disabled={experience.is_current} className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100" type="month" placeholder="End Date" value={experience.end_date || ""} onChange={(e)=>updateExperience(index, "end_date", e.target.value)} />
                                
                            </div>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={experience.is_current || false} onChange={(e)=>updateExperience(index, "is_current", e.target.checked ? true: false)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                                I currently work here
                            </label>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">

                                    <label htmlFor="" className="text-sm font-medium text-gray-700">
                                        Job Description
                                    </label>
                                    <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transitio-colors disabled:opacity-50">
                                        <Sparkles className="w-3 h-3 text-purple-800"/>
                                        Ai Enhance
                                    </button>

                                </div>

                                <textarea  placeholder="Description of your role and achievements" rows={4} className="w-full text-sm px-3 py-2 rounded-lg resize-none" value={experience.description || ""}  onChange={(e)=> updateExperience(index, "description", e.target.value)} />
                            </div>

                        </div>
                    ))

                    }


                </div>
            )
            }
            
        </div>

    )
}

export default ExperienceForm;