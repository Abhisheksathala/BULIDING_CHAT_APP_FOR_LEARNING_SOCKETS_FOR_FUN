import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else {
          toast.error(error?.data?.message || "somthing went wrong");
        }
      }
    });
  }, [errors]);
};



// export const useAsyncMutation = (mutationHook) => {
//   const [isloading, setIsLoading] = useState(false);
//   const [data, setData] = useState(null);

//   const [mutate] = mutationHook();

//   const excuteMutation = async (toastMessage, ...args) => {
//     setIsLoading(true);
//     const toastID = toast.loading(toastMessage || "updataing data...");
//     try {
//       const res = await mutate(...args).unwrap();
//       if (res?.data) {
//         toast.success(res.data.message || "updated data successfully...",{id:toastID});
//         setData(res.data)
//       } else {
//         const message =  res?.error?.data?.message || "somthing went wrong...";
//         toast.error(message ,{
//           id:toastID
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       const message = error?.response?.data?.message || "Something went wrong";
//       toast.error(message,{
//           id:toastID
//         });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return [
//     excuteMutation,
//     isloading,
//     data,
//   ];
// };


export const useAsyncMutation = (mutationHook) => {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const excuteMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastID = toast.loading(
      toastMessage || "Updating data..."
    );

    try {
      const res = await mutate(...args).unwrap();

      toast.success(
        res.message || "Updated successfully",
        { id: toastID }
      );

      setData(res);
    } catch (error) {
      console.log("RTK ERROR ", error);

      const message =
        error?.data?.message || "Something went wrong";

      toast.error(message, { id: toastID });
    } finally {
      setIsLoading(false);
    }
  };

  return [excuteMutation, isloading, data];
};


export const useSocketEvents = (socket,handlers)=>{
   useEffect(()=>{
    Object.entries(handlers).forEach(([event,handler])=>{
      socket.on(event,handler)
    })
      return ()=>{
         Object.entries(handlers).forEach(([event,handler])=>{
            socket.off(event,handler)
         })
      }
  },[socket,handlers])
}