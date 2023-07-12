const sortGoods = (property) => {
  
  switch (property) {
    case 'name':
      return {
         name: 1
       };
    
    case 'namer':
      return {
        name: -1
      };
    
    case 'price':
      return {
        price: 1
      };
    
    case 'pricer':
      return {
        price: -1
      };
    
    default: 
      return { name: 1 }
  }
};

export default sortGoods;
