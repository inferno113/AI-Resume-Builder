import React from "react";

const Footer =()=>{
    return (

            <footer className="w-full bg-gradient-to-t from-green-100 to-white-100 text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <img alt="" className="h-11"
                        src="logo.svg" />
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">

                    We welcome your feedback and suggestions to help us improve our product. If you have any questions or concerns, please don't hesitate to contact us.

                    
                </p>
            </div>
            <div className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="/">Ai Resume Builder</a> ©2026. All rights reserved.
                </div>
            </div>
        </footer>



    )

}

export default Footer