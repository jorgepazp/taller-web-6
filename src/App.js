import React, { useEffect,useState } from 'react';
import MaterialDatatable from "material-datatable";
import { useForm } from 'react-hook-form';
import axios from 'axios';


export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const [data, setData] = useState([]);
  const onSubmit = data =>{ 
    console.log(data);
    axios.post('http://localhost:8000/persona',data)
    .then(res=>{
      console.log(res)
      cargar();
    })
  }

  const cargar = () =>{
    axios.get('http://localhost:8000/personas')
    .then(res =>{
      setData(res.data.personas);
    })
  }

  useEffect(() => {
    console.log('TODAS LAS PERSONAS:');

    console.log(data);
  }, [data]);
  
  const columns = [{
      name: 'Nombre',
      field: 'nombre',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Apellido',
      field: 'apellido',
      options: {
        filter: true,
        sort: false
      }
    }
  ];

  const options = {
    filterType: 'checkbox'
  };
  const datas = data.map(personas => ({
    value: personas._id,
    nombre: personas.nombre,
    apellido: personas.apellido
  }));


  useEffect(() => {
    cargar();
  },[]);
  
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="nombre" name="nombre" ref={register} />
      <input type="text" placeholder="apellido" name="apellido" ref={register} />
      
      <input type="submit" />
      <MaterialDatatable
        title={'Personas'}
        data={datas}
        columns={columns}
        options={options}
      />

    </form>
  );
}