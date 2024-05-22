import { AuthToken } from "../../custom-function/authHook";

// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
    return new Promise(async (resolve) =>{
      //ToDo:We will not hard code the URL
      const response=await fetch('http://localhost:3400/products');
      const data=await response.json();
      resolve({data});
      
    }
    );
  }
  
  export function fetchProductsByFilter({filter,sort,pagination,admin}) {
    //filter ={'category':smartphone}
    //filtertobedone={'category}:['smartphone','laptop']
    //sort={_sort:"price",_order=desc}
    //pagination={_page:1,_limit:10}  //_page=1&_limit=10
    //ToDo:filter the products in the server side itself
    let queryString='';
    for(let key in filter){
      const categoryBrandValues=filter[key];
      // if(categoryValues.length){
      //   //const lastCategoryValue=categoryValues[categoryValues.length-1];
      //   for(let i=0;i<categoryValues.length;i++){
      //       queryString+=`${key}_like=${categoryValues[i]}&`
      //   }
        
      // }
      queryString+=`${key}_like=${[categoryBrandValues]}&`
    }
    for(let key in sort){
        queryString+=`${key}=${sort[key]}&`
    }
    for(let key in pagination){
      queryString+=`${key}=${pagination[key]}&`
  }
  if(admin){
    queryString+=`admin=true`
  }
    return new Promise(async (resolve) =>{
      //ToDo:We will not hard code the URL
      const token=AuthToken('get')
      const response=await fetch(`http://localhost:3400/products?${queryString}`,{
        method: 'GET',
        headers: {
          'jwttoken': `${token}`
        }});
      const data=await response.json();
      // const totalItems=await response.headers.get('X-Total-Count');
      resolve({data:{products:data.docs,totalItems:data.totalCount}});
      
    }
    );
  }
  
  export function fetchCategories() {
    return new Promise(async (resolve) =>{
      //ToDo:We will not hard code the URL
      const token=AuthToken('get');
      const response=await fetch('http://localhost:3400/categories',{
        method: 'GET',
        headers: {
          'jwttoken': `${token}`
        }});
      const data=await response.json();
      resolve({data});
      
    }
    );
  }
  
  export function fetchBrands() {
    return new Promise(async (resolve) =>{
      //ToDo:We will not hard code the URL
      const token=AuthToken('get');
      const response=await fetch('http://localhost:3400/brands',{
        method: 'GET',
        headers: {
          'jwttoken': `${token}`
        }});
      const data=await response.json();
      resolve({data});
      
    }
    );
  }
  
  export function fetchProductById(id){
    return new Promise(async (resolve)=>{
      const token=AuthToken('get');
      const response=await fetch('http://localhost:3400/products/'+id,{
        method: 'GET',
        headers: {
          'jwttoken': `${token}`
        }});
      const data=await response.json();
      resolve({data})
    })
  }
  
  export function createProduct(product){
    return new Promise(async (resolve)=>{
      const token=AuthToken('get');
      const response=await fetch('http://localhost:3400/products/',{
        method:'POST',
        body:JSON.stringify(product),
        headers:{'content-type':'application/json',
        'jwttoken': `${token}`
        }
      });
      const data=await response.json();
      resolve({data})
    })
  }
  
  export function updateProductById(product){
    const token=AuthToken('get');
    return new Promise(async (resolve,reject)=>{
     try{
      const response=await fetch('http://localhost:3400/products/'+product.id,{
        method:'PATCH',
        body:JSON.stringify(product),
        headers:{'content-type':'application/json',
        'jwttoken': `${token}`
        }
      });
      if(response.ok){
        const data=await response.json();
      
        resolve({data})
  
      }
      else{
        const err=await response.text();
         reject(err)
      }
     }
     catch(e){
      reject(e)
     }
    })
  }