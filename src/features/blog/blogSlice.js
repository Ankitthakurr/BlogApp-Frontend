import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

const userExist = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userExist ? userExist : null,
  isLoading: false,
  isSuccess: userExist ? true : false,
  isError: false,
  message: "",
  userData : [],
  blogData : null,
  messageDeleted : "",
  index : null,
  Edit : {
isEdit : false,
obj : {
  tittle : '',
  description : "",
  _id : '',
}
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
    reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      state.user = null
      state.blogData = null
      state.index = null
      // return initialState
    },
    timeout : (state)=>{
      state.message = null
      state.messageDeleted = ""
    },
    index : (state,action)=>{
        state.index = action.payload
    },
    edit : (state,action)=>{
return{
  ...state,
  Edit : {
    isEdit : true,
    obj : {
      tittle : action.payload.tittle,
      description : action.payload.description,
      _id : action.payload._id
    }
  }
}

    }
  },
  extraReducers: (build) => {
    build
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isError = false
        state.message = ""
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false
      })
      .addCase(loginUser.pending,(state)=>{
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.isError = false
        state.message = ""
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(getBlogData.pending,(state)=>{
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(getBlogData.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.blogData = action.payload
        state.isError = false
        state.message = ""
      })
      .addCase(getBlogData.rejected,(state,action)=>{
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
        state.isLoading = false
      })
      .addCase(createBlogData.pending,(state)=>{
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(createBlogData.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.blogData = [...state.blogData,action.payload]
        state.isError = false
        state.message = ""
      })
      .addCase(createBlogData.rejected,(state,action)=>{
        return{
          ...state,
          isError : true,
          isSuccess :false,
          isLoading : false,
          message : action.payload
        }
      })
      .addCase(deleteBlogData.pending,(state)=>{
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(deleteBlogData.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.blogData = action.payload.message ? state.blogData.filter((item)=> item._id !== action.payload._id) : [...state.blogData]
        state.isError = false
        state.message = ""
        state.messageDeleted = action.payload.message
      })
      .addCase(deleteBlogData.rejected,(state,action)=>{
        return{
          ...state,
          isError : true,
          isSuccess :false,
          isLoading : false,
          message : action.payload
        }
      })
      .addCase(editBlogData.pending,(state)=>{
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(editBlogData.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        const {message} = action.payload
        console.log(action.payload)
        state.blogData = state.blogData.map((item)=>item._id === message._id ? {...item, tittle : message.tittle , description : message.description } :item)
        state.isError = false
        state.message = ""
      })
      .addCase(editBlogData.rejected,(state,action)=>{
        return{
          ...state,
          isError : true,
          isSuccess :false,
          isLoading : false,
          message : action.payload
        }
      })
  },
});
export const { logout,timeout,index,edit } = blogSlice.actions;
export default blogSlice.reducer;

export const registerUser = createAsyncThunk(
  "REGISTER/USER",
  async (data, thunkapi) => {
    try {
      return await blogService.register(data);
    } catch (error) {
      const msg = error.response ? error.response.data.message : error.message
      return thunkapi.rejectWithValue(msg);
    }
  }
);

export const loginUser = createAsyncThunk("LOGIN/USER", async (data,thunkapi) => {
    try {
      return await blogService.login(data);
    } catch (error) {
      const msg = error.response ? error.response.data.message : error.message
      return thunkapi.rejectWithValue(msg)
    }
    
});

export const getBlogData = createAsyncThunk('GETBLOGDATA', async(data,thunkapi)=> {
  try {
    return await blogService.getBlogData(data);
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message
    return thunkapi.rejectWithValue(msg)
  }
})

export const createBlogData = createAsyncThunk('CREATEBLOGDATA', async(data,thunkapi)=> {
  try {
   return await blogService.createBlogData(data);
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message
   return thunkapi.rejectWithValue(msg)
  }
})
export const deleteBlogData = createAsyncThunk('deleteBlogData', async(data,thunkapi)=> {
  try {
   return {message : await blogService.deleteBlogData(data), _id : data}
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message
   return thunkapi.rejectWithValue(msg)
  }
})
export const editBlogData = createAsyncThunk('EDITBlogData', async(data,thunkapi)=> {
  try {
   return {message : await blogService.editBlogData(data), _id : data}
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message
   return thunkapi.rejectWithValue(msg)
  }
})


