/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'avataaars.io', 
        'admin.wellness4u.in',
        'secure.gravatar.com'
      ],
    },

    // middleware: {
    //   '/account': true,  // Apply middleware to /account route

 
    // },


  };
  
  export default nextConfig;
  