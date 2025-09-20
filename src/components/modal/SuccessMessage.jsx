import React from 'react'

const SuccessMessage = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 '>
      <div className='bg-white rounded-lg shadow-xl px-8 py-6 text-center animate-fade-in scale-100 transition-all duration-300 max-w-sm w-full border border-green-500'>
        <div className='text-green-600 text-4xl mb-2'>✔️</div>
        <h2 className='text-xl font-semibold text-gray-800'>Applied Successfully!</h2>
        <p className='text-gray-600 mt-2 text-sm'>Your application has been submitted.</p>
      </div>
    </div>
  )
}

export default SuccessMessage
