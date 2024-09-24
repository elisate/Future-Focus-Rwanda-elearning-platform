import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useEffect } from 'react'
function RequestForm() {

     const {
       register,
       handleSubmit,
       formState: { errors },
    } = useForm();
    
     const onSubmit = async (data) => {
       const { email } = data;
      
         try {
             const formData = {
                 email,
             };

             const res = await axios.post(
                 "https://future-focus-rwanada.onrender.com/password/requestReset",
                 formData,
                 {
                     headers: {
                         "Content-Type": "application/json",
                     },
                 }
             );

            
         } catch (error) {
        
             console.log(error);
         }
     };

  return (
    <div className="flex justify-center bg-red-300">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          {...register("email", { required: true })}
        />
        <button type="submit" className='bg-green-400'>submit</button>
      </form>
    </div>
  );
}

export default RequestForm