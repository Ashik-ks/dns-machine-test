import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer class="bg-black text-white py-8 mt-10">
   <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
    <div class="flex-1 flex justify-center md:justify-end">
     <div class="border border-gray-600 p-6 rounded-lg text-center">
      <h3 class="text-blue-500 mb-4">
       CONNECT WITH US
      </h3>
      <p class="flex items-center justify-center space-x-2">
       <i class="fas fa-phone-alt text-yellow-500">
       </i>
       <span>
        +91 9567843340
       </span>
      </p>
      <p class="flex items-center justify-center space-x-2 mt-2">
       <i class="fas fa-envelope text-yellow-500">
       </i>
       <span>
        info@deepnetsoft.com
       </span>
      </p>
     </div>
    </div>
    <div class="flex-1 flex justify-center">
     <div class="text-center">
      <h3 class="text-2xl font-bold">
       <span class="text-blue-500">
        DEEP
       </span>
       <span class="text-white">
        NET
       </span>
       <span class="text-gray-500">
        SOFT
       </span>
      </h3>
      <div class="flex justify-center space-x-4 mt-4">
       <a class="text-white" href="#">
        <i class="fab fa-facebook-f">
        </i>
       </a>
       <a class="text-white" href="#">
        <i class="fab fa-twitter">
        </i>
       </a>
       <a class="text-white" href="#">
        <i class="fab fa-youtube">
        </i>
       </a>
       <a class="text-white" href="#">
        <i class="fab fa-instagram">
        </i>
       </a>
      </div>
     </div>
    </div>
    <div class="flex-1 flex justify-center md:justify-start">
     <div class="border border-gray-600 p-6 rounded-lg text-center">
      <h3 class="text-blue-500 mb-4">
       FIND US
      </h3>
      <p class="flex items-center justify-center space-x-2">
       <i class="fas fa-map-marker-alt text-yellow-500">
       </i>
       <span>
        First floor, Geo infopark, Infopark EXPY, Kakkanad
       </span>
      </p>
     </div>
    </div>
   </div>
   <div class="border-t border-gray-700 mt-8 pt-4">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
     <p>
      © 2024 Deepnetsoft Solutions. All rights reserved.
     </p>
     <div class="flex space-x-4 mt-4 md:mt-0">
      <a class="hover:text-white" href="#">
       Terms &amp; Conditions
      </a>
      <a class="hover:text-white" href="#">
       Privacy Policy
      </a>
     </div>
    </div>
   </div>
  </footer>
    </div>
  )
}

export default Footer
