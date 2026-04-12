import { Check, Layout } from "lucide-react";
import React from "react";
import { useState } from "react";

const TemplateSelector = ({selectedTemplate, onChange})=>{

    const [isOpen, setIsOpen] =useState(false);

    const templates = [
        {id:"classic", name:"Classic", preview: "A clean and traditional resume layout with a focus on readability and organization."},
        {id:"modern", name:"Modern", preview: "A sleek and contemporary design with bold typography and a unique layout to make your resume stand out."},
        {id:"minimal", name:"Minimal", preview: "A simple and elegant design that emphasizes content with ample white space and a clean layout."},
        {id:"minimal-image", name:"Minimal with Image", preview: "A minimal design with a focus on showcasing your image and visual portfolio."},
    ]

    return(
        <div className="relative">

            <button onClick={()=> setIsOpen(!isOpen)} className="flex items-center gap-1 text-sm text-blue-400 bg-gradient-to-br from-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg">
                <Layout className="size-4"/>
                <span className="max-sm:hidden">Template</span>

            </button>

            { isOpen && (
                <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border=gray-200 shadow-sm">

                    {templates.map((template)=>(
                        <div key={template.id} onClick={()=>{onChange(template.id);setIsOpen(false)}} className={`cursor-pointer realtive p-3 border rounded-md transition-all ${selectedTemplate===template.id ? "border-blue-400 bg-blue-100": "border-gray-300 hover:bg-gray-100 hover:border-gray-400 "}`}>

                            {selectedTemplate === template.id && <div className="absolute top-2 right-2 text-green-500">
                                <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white"/>
                                </div>
                            
                            </div>
                            }

                            <div className="space-y-1">
                                <h4 className="font-medium text-gray-800">{template.name}</h4>
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                                    {template.preview}
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            )

            }



        </div>
    )

}

export default TemplateSelector;