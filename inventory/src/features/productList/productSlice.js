import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,
  fetchProductsByFilter,
  fetchCategories,
  fetchBrands,
  fetchProductById,
  createProduct,
  updateProductById } from './productAPI';

const initialState = {
  products: [],
  totalItems:0,
  categories:[],
  brands:[],
  selectedProduct:null,
  status: 'idle',
  error:null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({filter,sort,pagination,admin}) => {
    const response = await fetchProductsByFilter({filter,sort,pagination,admin});
    return response.data;
  }
);
export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);


export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductByID',
  async (id,{rejectWithValue}) => {
   try{
    const response = await fetchProductById(id);
    return response.data;
   }
   catch(error){
      return rejectWithValue(JSON.parse(error).message)
   }
  }
);
export const addNewProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductByIdAsync = createAsyncThunk(
  'product/updateProductById',
  async (product) => {
    const response = await updateProductById(product);
    return response.data;
  }
);
export const productSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct =null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
        state.error=null
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        state.error=null
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
        state.error=null
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.error=null
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
        state.error=null
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error=null
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
        state.error=null
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
        state.error=null
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
        state.error=null
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
        state.error=null
      })
      .addCase(addNewProductAsync.pending, (state) => {
        state.status = 'loading';
        state.error=null
      })
      .addCase(addNewProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
        state.error=null
      })
      .addCase(updateProductByIdAsync.pending, (state) => {
        state.status = 'loading';
        state.error=null
      })
      .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex((product)=>product.id===action.payload.id)
        state.products[index]=action.payload;
        state.selectedProduct = action.payload;
        state.error=null
      })
      .addCase(updateProductByIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })

  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllBrands=(state)=>state.product.brands;
export const selectAllCategories=(state)=>state.product.categories;
export const allItems=(state)=>state.product.totalItems;
export const selectProductById=(state)=>state.product.selectedProduct;
export const productListStatus=(state)=>state.product.status;
export const errorMessage=(state)=>state.product.error;
export default productSlice.reducer;
