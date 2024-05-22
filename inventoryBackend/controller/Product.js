const {Product}=require('../models/Product');

exports.createProduct= async (req,res)=>{
    try{
        const product=await Product.insertMany(req.body);
        res.status(201).json(
            
            product
        )
    }
    catch(e){
          res.status(400).json({
            message:e.message
          })
    }

    
};

exports.fetchAllProducts=async (req,res)=>{
   
          //filter ={'category':smartphone}
  //filtertobedone={'category}:['smartphone','laptop']
  //sort={_sort:"price",_order=desc}
  //pagination={_page:1,_limit:10}  //_page=1&_limit=10
  //ToDo:filter the products in the server side itself
       let totalDocsCount= req.query.role==='user'?Product.find({deleted:{$ne:true}}):Product.find()
       let condition={};
       if(!req.query.admin){
          condition.deleted={$ne:true}
       }
        let query= Product.find(condition);
       
        // Handle multiple category_like filters
        if (req.query.category_like) {
          const categories = Array.isArray(req.query.category_like) ? req.query.category_like : req.query.category_like.split(',');
          query = query.find({ category: { $in: categories } });
          totalDocsCount = totalDocsCount.find({ category: { $in: categories } });
        }
    
        // Handle multiple brands_like filters
        if (req.query.brand_like) {
          const brands = Array.isArray(req.query.brand_like) ? req.query.brand_like : req.query.brand_like.split(',');
          query = query.find({ brand: { $in: brands } });
          totalDocsCount = totalDocsCount.find({ brand: { $in: brands } });
        }
        if(req.query._sort && req.query._order)
        {
            query=  query.sort({[req.query._sort]:req.query._order});
        }
        //toDo:sort based on discounted price
        if(req.query._page && req.query._limit)
        {
            const pageSize=req.query._limit;
            const page=req.query._page
            query=  query.skip(pageSize*(page-1)).limit(pageSize);
        }
        const totalCount=await totalDocsCount.count().exec(); //query for getting total count
    try{   
        const docs=await query.exec()
        await res.set('X-Total-Count',totalCount);   //setting header for totalCount
        res.status(200).json(
            {docs:docs,totalCount:totalCount}
        )
    }
    catch(e){
        res.status(400).json({
          message:e.message
        })
  }
};

exports.fetchProductById=async (req,res)=>{
    const _id=req.params.id
     try{
        const product= await Product.findById(_id);
        res.status(200).json(
            product
        )
     }
     catch(e){
        res.status(400).json({
            message:e.message
        })
     }
}

exports.updateProductById=async (req,res)=>{
    const _id=req.params.id;
     try{
        const product= await Product.findByIdAndUpdate(_id,req.body,{new:true});
        res.status(200).json(
            
            product
        )
     }
     catch(e){
        res.status(400).json({
            message:e.message
        })
     }
}