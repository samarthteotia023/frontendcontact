"use client"
const UR="http://localhost:8000"


export async function fetchAPI(

    path: string,
  
    options = {}
  ) {
    const value:any=localStorage.getItem("token");
    const token=JSON.parse(value);
    try {
      // Merge default and user options
      const mergedOptions: any = {
        cache: "no-store",
        //next: { revalidate: 3600 },
        // todo add cache later
        //next: { revalidate },
        headers: new Headers({
          "Content-Type": "application/json;charset=UTF-8", //  HERE!
          "authorization":`Bearer ${token}`
        }),
        ...options,
      };
  
      // Build request URL
  
      const requestUrl = `${UR}/api/${path}`;
  
      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);
  
      if (response.ok) {
      
        const data = await response.json();

        return data;
      }
    } catch (error) {
      console.error("jjj", error);
      // throw new Error(
      //   `Please check if your server is running and you set all the required tokens.`
      // );
    }
  }