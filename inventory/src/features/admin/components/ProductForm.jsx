import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import { useNavigate,Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Modal from '../../commonComponents/Modal';
import {
    fetchAllCategoriesAsync,
    fetchAllBrandsAsync,  
    selectAllCategories,
    selectAllBrands,
    addNewProductAsync,
    fetchProductByIdAsync,
    selectProductById,
    updateProductByIdAsync,
    clearSelectedProduct,
    errorMessage
    
  } from "../../productList/productSlice";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import { useAlert } from 'react-alert';
export function ProductForm(){
    const navigate=useNavigate();
  const [openModal,setOpenModal]=useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm();
    const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const dispatch=useDispatch();
  const selectedProduct=useSelector(selectProductById)
  const error=useSelector(errorMessage);
  const params=useParams()
  //const alert=useAlert()
  useEffect(()=>{
    if(params.id){
        dispatch(fetchProductByIdAsync(params.id))
        //ToDo:Reset the form
        reset()
        
    }
    else{
        dispatch(clearSelectedProduct())
        
    }
  },[params.id,dispatch])
  useEffect(()=>{
    if(selectedProduct && params.id){
        setValue('title',selectedProduct.title)
        setValue('description',selectedProduct.description)
        setValue('price',selectedProduct.price)
        setValue('discount',selectedProduct.discountPercentage)
        setValue('stock',selectedProduct.stock)
        setValue('brand',selectedProduct.brand)
        setValue('category',selectedProduct.category)
        setValue('thumbnail',selectedProduct.thumbnail)
        setValue('image1',selectedProduct.images[0])
        setValue('image2',selectedProduct.images[1])
        setValue('image3',selectedProduct.images[2])
        setValue('image4',selectedProduct.images[3])
    }
},[selectedProduct,params.id,setValue])
function handleDeleteProduct(){
    const product={...selectedProduct};
    product.deleted=true;
    dispatch(updateProductByIdAsync(product))
}

function routeToAdmin(){
    navigate('/admin',{replace:true})
}
    return (
      <>
     {
      selectedProduct &&               <Modal
      title={`Delete ${selectedProduct.title}`}
      message="Are you sure you want to delete?"
      dangerOption="Delete"
      cancelOption="Cancel"
      dangerAction={ ()=>{handleDeleteProduct()}}
      cancelAction={()=>{setOpenModal(false)}}
      showModal={openModal}
    ></Modal>
     }
      
      <form
        noValidate
        onSubmit={handleSubmit((data)=>{
            const product={...data};
            product.images=[product.image1,product.image2,product.image3,product.image4]
            product.rating=0
            product.price=parseFloat(product.price);
            product.discountPercentage=parseFloat(product.discount)
            product.stock=parseInt(product.stock)
            delete product['image1']
            delete product['image2']
            delete product['image3']
            delete product['image4']
            if(params.id){
                product.id=params.id
                product.rating=selectedProduct.rating || 0
                dispatch(updateProductByIdAsync(product))
                //api pass fail to be checked
                if(error){
                    alert('failed to dispatch')
                }
                else{
                    alert('product updated successfully')
                }
            }
            else{
                dispatch(addNewProductAsync(product))
                //api pass fail to be checked
                alert('Product Created')
            }
            routeToAdmin();
        })}
        >
          <div className="space-y-12 bg-white p-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
              {selectedProduct && selectedProduct?.deleted && <h2 className="text-base font-semibold leading-7 text-red-700">This Product is deleted</h2>
            }
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register('title',{
                            required: "title is required",
                        })}
                        id="title"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                  </div>
                </div>
    
                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register('description',{
                        required: "description is required",
                    })}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about Product.</p>
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <div className="col-span-full">
                  <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                    Brand
                  </label>
                  <div className="mt-2">
                    <select id="brand"
                    {...register('brand',{
                        required: "brand is required",
                    })}
                    >
                    <option value="">--choose brand--</option>
                    {
                            brands.map((brand)=>{
                                return <option key={brand.value} value={brand.value}>{brand.label}</option>
                            })
                        }

                    </select>
                    {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
                  </div>
                 
                </div>
                <div className="col-span-full">
                  <label htmlFor="categories" className="block text-sm font-medium leading-6 text-gray-900">
                    Categories
                  </label>
                  <div className="mt-2">
                    <select id="categories"
                    {...register('category',{
                        required: "category is required",
                    })}>
                        <option value="">--choose category--</option>
                    {
                            categories.map((category)=>{
                                return <option key={category.value} value={category.value}>{category.label}</option>
                            })
                        }

                    </select>
                    {errors.categories && <p className="text-red-500">{errors.categories.message}</p> }
                  </div>
                 
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="number"
                        {...register('price',{
                            required: "price is required 0>=price>=10000",
                            min:1,
                            max:10000
                        })}
                        id="price"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.price && <p className="text-red-500">{errors.price.message}</p> }

                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                    Discount Percentage
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="number"
                        {...register('discount',{
                            required: "discount is required 0<=discount<=100",
                            min:0,
                            max:100
                        })}
                        id="discount"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.discount && <p className="text-red-500">{errors.discount.message}</p> }
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                    Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="number"
                        {...register('stock',{
                            required: "stock is required",
                            min:0
                        })}
                        id="stock"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.stock && <p className="text-red-500">{errors.stock.message}</p> }
                  </div>
                </div>
    
                <div className="sm:col-span-6">
                  <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register('thumbnail',{
                            required: "thumbnail is required",
                        })}
                        id="thumbnail"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p> }
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                    Image 1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        
                        {...register('image1',{
                            required: "image1 is required",
                        })}
                        id="image1"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.image1 && <p className="text-red-500">{errors.image1.message}</p> }
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                    Image 2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register('image2',{
                            required: "image2 is required",
                        })}
                        id="image2"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.image2 && <p className="text-red-500">{errors.image2.message}</p> }
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                    Image 3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register('image3',{
                            required: "image3 is required",
                        })}
                        id="image3"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.image3 && <p className="text-red-500">{errors.image3.message}</p> }
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                    Image 4
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        type="text"
                        {...register('image4',{
                            required: "image4 is required",
                        })}
                        id="image4"
                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.image4 && <p className="text-red-500">{errors.image4.message}</p> }
                  </div>
                </div>
              </div>
            </div>
    
           
    
           
          </div>
          
            <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to="/admin">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            </Link>
            {
                (selectedProduct && params.id && !selectedProduct.deleted)?<button 
                onClick={()=>{setOpenModal(true)}}
                type="button" className=" rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                Delete
              </button>:null
            }
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
          
    
          
        </form>
      </>
      
      )
}