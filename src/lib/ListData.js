import axios from "axios"

const getData =async () => {

   try {
    let res= await axios({
        method: 'get',
        url: "https://fakestoreapi.com/products"
        
      })
       return res.data
    
   } catch (error) {
    console.error(error)
   }
        
}

export default getData