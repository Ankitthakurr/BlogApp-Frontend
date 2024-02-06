import React from 'react'

const AdminPage = () => {
  return (
    <div className='flex justify-center items-center flex-col p-5'>
      <div className='innerDiv w-[50%] min-h-[130px] flex flex-col justify-center items-center '>
        <h1 className='font-bold text-xl'>name</h1>
        <button className='bg-slate-700 w-[50%] text-white max-[500px]:text-sm text-lg rounded py-[2px] hover:bg-black'>Check</button>
      </div>
    </div>
  )
}

export default AdminPage
