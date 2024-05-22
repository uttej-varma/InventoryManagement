import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../app/constants";

export function Pagination({handlePage,page,setPage,totalItems}) {
    const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE)
    return (
      <>
        <div className="flex flex-1 justify-between sm:hidden">
        <div
                className="relative z-10 inline-flex items-center  px-4 py-2 text-sm 
                font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                onClick={(e)=>{handlePage(page>1?page-1:1)}}>
            Previous
          </div>
          <div
                className="relative z-10 inline-flex items-center  px-4 py-2 text-sm 
                font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                onClick={(e)=>{handlePage(page<totalPages?page+1:page)}}>
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{ (page-1)*ITEMS_PER_PAGE+1}</span>{''}
              to
              <span className="font-medium">{page*ITEMS_PER_PAGE > totalItems?totalItems:page*ITEMS_PER_PAGE}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                className="relative z-10 inline-flex items-center  px-4 py-2 text-sm 
                font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                onClick={(e)=>{handlePage(page>1?page-1:1)}}>
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </div>
               
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {Array.from({length:totalPages}).map((el,index)=>(
                 <div
                 onClick={(e)=>{handlePage(index+1)}}
                aria-current="page"
                className={
                  ` relative z-10 inline-flex items-center ${page===index+1?'bg-indigo-600 text-white':'bg-white text-gray-400'} px-4 py-2 text-sm 
                  font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`
                }            >
                {index+1}
              </div>
  
              )
              
              )
              
              }
  
                <div
                className="relative z-10 inline-flex items-center  px-4 py-2 text-sm 
                font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                onClick={(e)=>{handlePage(page<totalPages?page+1:page)}}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
            </nav>
          </div>
        </div>
      </>
    );
  }