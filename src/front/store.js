export const initialStore=()=>{
  return{
    message: null,
    perfilUsuario:[]
    
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
     case 'set_perfilUsuario':
      return {
        ...store,
        perfilUsuario: action.payload
      }; 
   
    default:
      throw Error('Unknown action.');
  }    
}
