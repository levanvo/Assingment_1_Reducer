import { useState, useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Share, instance } from './Reducer/ShareReducer'

function App() {
  const { dispatch } = useContext(Share);
  const { state } = useContext(Share);
  console.log(state);

  useEffect(() => {
    const getAPI = async () => {
      const { data } = await instance.get(`products`);
      dispatch({ type: "fetchAPI", payload: data });
    };
    getAPI();
  }, []);

  const AddPr = async () => {
    if (state.data.length < 1) {
      const data = {
        id: 1,
        name: "Product-" + Math.floor(Math.random() * 30),
        price: Math.round(Math.random() * 9999),
      };
      await instance.post(`products`, data);
      dispatch({ type: "addPr", payload: data });
      alert("Add successfully product===> " + data.name);
    } else {
      const data = {
        id: state.data[state.data.length - 1].id + 1,
        name: "Product-" + Math.floor(Math.random() * 30),
        price: Math.round(Math.random() * 9999),
      };
      await instance.post(`products`, data);
      dispatch({ type: "addPr", payload: data });
      alert("Add successfully product===> " + data.name);
    }
  }

  const UpdatePr = async (data: any) => {
    const update = {
      id: data.id,
      name: data.name + " - updated",
      price: Math.round(Math.random() * 9999),
    };
    await instance.put(`products/${update.id}`, update);
    dispatch({ type: "updatePr", payload: update });
    alert("Updated product===> " + update.name);
  };

  const RemovePr = async (id: string | number) => {
    const consider = window.confirm(`Do you want remove this product ?`);
    if (consider) {
      await instance.delete(`products/${id}`);
      dispatch({ type: "removePr", payload: id });
    };
  };
  return (
    <div className="">
      <p className='text-center font-bold text-4xl mb-6'>Dashboard</p>
      <div className="flex justify-center">
        <button onClick={() => AddPr()} className='w-72'>Add Product</button>
      </div>
      <table className='w-[600px] mx-auto text-center mt-5'>
        <thead className='border-b border-white'>
          <tr className='text-2xl'>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {state?.data?.length < 1 ?
            <p key={1} className='text-center'>The shop is empty, please vite next time, sorry !! </p>
            :
            state?.data?.map((items: any) => (
              <tr className='' key={items.id}>
                <td className='harsh_light'>{items.id} -</td>
                <td>{items.name}</td>
                <td className='text-orange-400'>{items.price} $</td>
                <td>
                  <button className='border border-green-400 mr-1 mt-2' onClick={() => UpdatePr(items)}>Update</button>
                  <button className='border border-red-400' onClick={() => RemovePr(items.id)}>Remove</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
